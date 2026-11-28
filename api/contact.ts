import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactRequestBody {
  name?: string;
  email?: string;
  requestType?: string;
  message?: string;
  website_url_hp?: string;
}

const REQUEST_TYPES = [
  'General question',
  'Privacy request (access, correction or deletion of my data)',
  'Support',
  'Feedback'
] as const;

const ipRequests = new Map<string, number>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const realIp = req.headers['x-real-ip'];
  const vercelIp = req.headers['x-vercel-forwarded-for'];
  const forwarded = req.headers['x-forwarded-for'];
  const rawIp = (typeof realIp === 'string' && realIp)
    || (typeof vercelIp === 'string' && vercelIp.split(',')[0].trim())
    || (typeof forwarded === 'string' && forwarded.split(',')[0].trim())
    || (Array.isArray(forwarded) && forwarded[0]?.split(',')[0].trim())
    || req.socket?.remoteAddress;
  const clientIp = rawIp || 'unknown';
  const now = Date.now();

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

  const { name, email, requestType, message, website_url_hp } = req.body as ContactRequestBody;

  if (website_url_hp) {
    return res.status(200).json({ success: true, message: 'Message received' });
  }

  const cleanName = typeof name === 'string' ? name.trim() : '';
  if (!cleanName || cleanName.length > 100) {
    return res.status(400).json({ message: 'Please provide your name.' });
  }

  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase().replace(/[\r\n]/g, '') : '';
  if (!cleanEmail || cleanEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  if (typeof requestType !== 'string' || !REQUEST_TYPES.includes(requestType as typeof REQUEST_TYPES[number])) {
    return res.status(400).json({ message: 'Invalid request type.' });
  }

  const cleanMessage = typeof message === 'string' ? message.trim() : '';
  if (!cleanMessage || cleanMessage.length > 2000) {
    return res.status(400).json({ message: 'Message must be between 1 and 2000 characters.' });
  }

  // 1. Firebase Admin SDK (server-side) if service account credentials are configured
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (serviceAccountJson || (projectId && clientEmail && privateKey)) {
    try {
      const [{ initializeApp, getApps, cert }, { getFirestore, FieldValue }] = await Promise.all([
        import('firebase-admin/app'),
        import('firebase-admin/firestore')
      ]);

      const app =
        getApps()[0] ??
        initializeApp({
          credential: cert(
            serviceAccountJson
              ? JSON.parse(serviceAccountJson)
              : { projectId, clientEmail, privateKey }
          )
        });

      const db = getFirestore(app);
      await db.collection('contact').add({
        name: cleanName,
        email: cleanEmail,
        requestType,
        message: cleanMessage,
        createdAt: FieldValue.serverTimestamp()
      });

      return res.status(201).json({ success: true, message: 'Message received' });
    } catch {
      return res.status(500).json({ message: 'Failed to record contact message.' });
    }
  }

  // 2. Supabase fallback if configured
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          request_type: requestType,
          message: cleanMessage,
          created_at: new Date().toISOString()
        })
      });

      if (response.ok) {
        return res.status(201).json({ success: true, message: 'Message received' });
      }
      return res.status(500).json({ message: 'Failed to record contact message.' });
    } catch {
      return res.status(500).json({ message: 'Database connection error.' });
    }
  }

  // 3. Formspree fallback if configured
  const formspreeId = process.env.FORMSPREE_FORM_ID;
  if (formspreeId) {
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          requestType,
          message: cleanMessage
        })
      });

      if (response.ok) {
        return res.status(200).json({ success: true, message: 'Message received' });
      }
      return res.status(502).json({ message: 'Failed to record contact message.' });
    } catch {
      return res.status(502).json({ message: 'Database connection error.' });
    }
  }

  return res.status(503).json({ message: 'Contact service is temporarily unavailable.' });
}

