import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'crypto';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

interface WaitlistRequestBody {
  email?: string;
  role?: string;
  source?: string;
  website_url_hp?: string;
}

// In-memory rate limiting map for basic protection with periodic eviction
const ipRequests = new Map<string, number>();

function getDb() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ?.replace(/^"|"$/g, '')
      .replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) return null;

    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  return getFirestore();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Rate limiting: prefer trusted edge proxy headers
  const realIp = req.headers['x-real-ip'];
  const vercelIp = req.headers['x-vercel-forwarded-for'];
  const forwarded = req.headers['x-forwarded-for'];
  const rawIp =
    (typeof realIp === 'string' && realIp) ||
    (typeof vercelIp === 'string' && vercelIp.split(',')[0].trim()) ||
    (typeof forwarded === 'string' && forwarded.split(',')[0].trim()) ||
    (Array.isArray(forwarded) && forwarded[0]?.split(',')[0].trim()) ||
    req.socket?.remoteAddress;
  const clientIp = rawIp || 'unknown';
  const now = Date.now();

  // Periodic eviction to prevent unbounded map growth
  if (ipRequests.size > 1000) {
    const cutoff = now - 60000;
    for (const [ip, timestamp] of ipRequests.entries()) {
      if (timestamp < cutoff) ipRequests.delete(ip);
    }
  }

  const lastRequest = ipRequests.get(clientIp) || 0;
  if (now - lastRequest < 2000) {
    return res.status(429).json({ message: 'Too many requests. Please slow down.' });
  }
  ipRequests.set(clientIp, now);

  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Invalid request body.' });
  }

  const { email, role, source, website_url_hp } = req.body as WaitlistRequestBody;

  // Honeypot: trap bots silently
  if (website_url_hp) {
    return res.status(200).json({ success: true, message: 'Joined successfully' });
  }

  // Server-side email validation (RFC 5321 length limit)
  if (
    !email ||
    typeof email !== 'string' ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return res.status(400).json({ message: 'A valid email address is required.' });
  }

  const ALLOWED_ROLES = ['lifter', 'home_cook', 'coach'] as const;
  if (
    role !== undefined &&
    (typeof role !== 'string' ||
      !ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number]))
  ) {
    return res.status(400).json({ message: 'Invalid role selection.' });
  }

  const cleanEmail = email.trim().toLowerCase().replace(/[\r\n]/g, '');
  const cleanRole = typeof role === 'string' ? role : 'lifter';
  const cleanSource =
    typeof source === 'string'
      ? source.replace(/[^\w.-]/g, '').slice(0, 50) || 'maxiii.app'
      : 'maxiii.app';

  // Connect to Firestore with the Admin SDK (keys live only in Vercel env vars)
  let db;
  try {
    db = getDb();
  } catch (err) {
    console.error('Firebase init failed:', (err as Error).message);
    return res.status(503).json({ message: 'Waitlist service is temporarily unavailable.' });
  }
  if (!db) {
    console.error('Missing FIREBASE_* environment variables');
    return res.status(503).json({ message: 'Waitlist service is temporarily unavailable.' });
  }

  // Hashed email as document ID blocks duplicate signups from any device
  const id = createHash('sha256').update(cleanEmail).digest('hex');

  try {
    await db.collection('waitlist').doc(id).create({
      email: cleanEmail,
      role: cleanRole,
      source: cleanSource,
      createdAt: FieldValue.serverTimestamp(),
    });
    return res.status(201).json({ success: true, message: 'Joined waitlist' });
  } catch (err: any) {
    if (err?.code === 6 || String(err?.message).includes('ALREADY_EXISTS')) {
      return res.status(409).json({ code: 'DUPLICATE', message: 'Email already registered' });
    }
    console.error('Waitlist write failed:', err?.message);
    return res.status(500).json({ message: 'Failed to record waitlist entry' });
  }
}