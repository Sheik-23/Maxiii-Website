import React, { useState, useEffect } from 'react';
import { TransitionLink } from '../transitions/TransitionLink';

const REQUEST_TYPES = [
  'General question',
  'Privacy request (access, correction or deletion of my data)',
  'Support',
  'Feedback'
] as const;

type RequestType = typeof REQUEST_TYPES[number];

const LABEL_CLASS =
  'font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-cream flex items-center justify-between';
const CONTROL_BASE =
  'w-full bg-[#141418] text-cream border border-[rgba(251,241,220,0.22)] rounded-[6px] py-[14px] px-4 font-sans text-[15px] leading-[1.5] transition-[border-color,box-shadow] duration-200 box-border placeholder:text-[rgba(251,241,220,0.35)] focus:outline-none focus:border-saffron focus:shadow-[0_0_0_3px_rgba(255,138,31,0.25)]';
const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23FF8A1F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")";

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [requestType, setRequestType] = useState<RequestType>('General question');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Contact | MAXIII';

    let metaDesc = document.querySelector('meta[name="description"]');
    let created = false;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
      created = true;
    }
    const previousDesc = metaDesc.getAttribute('content');
    metaDesc.setAttribute(
      'content',
      'Contact the MAXIII team for general inquiries, support, feedback, or privacy and data requests.'
    );

    return () => {
      if (created && metaDesc?.parentNode) {
        metaDesc.parentNode.removeChild(metaDesc);
      } else if (previousDesc && metaDesc) {
        metaDesc.setAttribute('content', previousDesc);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setErrorMessage('Please provide your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!trimmedMessage) {
      setErrorMessage('Please enter your message.');
      return;
    }

    if (trimmedMessage.length > 2000) {
      setErrorMessage('Message cannot exceed 2000 characters.');
      return;
    }

    try {
      const lastSubmitTime = localStorage.getItem('maxiii_contact_last_submit');
      if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime, 10) < 5000) {
        setErrorMessage('Please wait a moment before submitting again.');
        return;
      }
    } catch {
      // Ignore storage read restrictions
    }

    setIsSubmitting(true);

    try {
      const [{ collection, addDoc, serverTimestamp }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../firebase')
      ]);
      let timeoutId: number | undefined;
      try {
        await Promise.race([
          addDoc(collection(db, 'contact'), {
            name: trimmedName,
            email: trimmedEmail.toLowerCase(),
            requestType,
            message: trimmedMessage,
            createdAt: serverTimestamp()
          }),
          new Promise<never>((_, reject) => {
            timeoutId = window.setTimeout(() => reject(new Error('Request timed out')), 10000);
          })
        ]);
      } finally {
        if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      }

      try {
        localStorage.setItem('maxiii_contact_last_submit', Date.now().toString());
      } catch {
        // Ignore storage restrictions
      }

      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setRequestType('General question');
    } catch {
      setErrorMessage('Failed to send your message. Please try again or email privacy@maxiii.app directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="bg-black text-cream min-h-svh pt-[calc(140px+env(safe-area-inset-top))] px-6 pb-[120px] max-[640px]:pt-[calc(110px+env(safe-area-inset-top))] max-[640px]:px-5 max-[640px]:pb-20"
      aria-label="Contact page"
    >
      <div className="max-w-[680px] mx-auto">
        <header className="border-b border-[rgba(251,241,220,0.2)] pb-7 mb-9">
          <div className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-saffron mb-3">
            GET IN TOUCH
          </div>
          <h1 className="font-display text-[clamp(2.8rem,6.5vw,4.5rem)] uppercase tracking-[0.02em] leading-none mb-3.5 text-cream">
            Contact
          </h1>
          <p className="font-sans text-[16px] leading-[1.6] text-[rgba(251,241,220,0.85)] m-0">
            Have a question, feedback, or a data request? Reach out directly below.
          </p>
        </header>

        {/* Short Privacy Note */}
        <div
          className="bg-[rgba(255,138,31,0.08)] border border-[rgba(255,138,31,0.28)] rounded-[8px] py-4 px-5 mb-9"
          role="region"
          aria-label="Privacy notice"
        >
          <p className="font-sans text-[14px] leading-[1.6] text-cream m-0">
            For privacy requests, choose &ldquo;Privacy request&rdquo; and tell us what you need. You can also email{' '}
            <a
              href="mailto:privacy@maxiii.app"
              className="text-saffron underline underline-offset-[3px] transition-opacity duration-200 hover:opacity-80"
            >
              privacy@maxiii.app
            </a>.
          </p>
        </div>

        {isSuccess ? (
          <div
            className="py-[18px] px-[22px] rounded-[8px] mt-2 font-sans text-[15px] leading-[1.6] bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.4)] text-[#86efac]"
            role="status"
            aria-live="polite"
          >
            <div className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-[#4ade80] mb-1.5">
              MESSAGE RECEIVED
            </div>
            <p>Thanks, we&apos;ll reply you soon</p>
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="mt-4 bg-transparent border border-[rgba(251,241,220,0.3)] text-cream py-2.5 px-[18px] rounded-[4px] font-sans text-[13px] cursor-pointer transition-all duration-200 hover:border-saffron hover:text-saffron"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate={false}>
            {/* Honeypot field */}
            <input
              type="text"
              name="website_url_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute -left-[9999px] -top-[9999px] opacity-0 w-0 h-0 pointer-events-none invisible"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {errorMessage && (
              <div
                className="py-[18px] px-[22px] rounded-[8px] mt-2 font-sans text-[15px] leading-[1.6] bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.4)] text-[#fca5a5]"
                role="alert"
                aria-live="assertive"
              >
                <div className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-[#f87171] mb-1.5">
                  SUBMISSION ERROR
                </div>
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className={LABEL_CLASS}>
                <span>
                  Name<span className="text-saffron ml-1">*</span>
                </span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                maxLength={100}
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={CONTROL_BASE}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className={LABEL_CLASS}>
                <span>
                  Email<span className="text-saffron ml-1">*</span>
                </span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                maxLength={254}
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={CONTROL_BASE}
                autoComplete="email"
              />
            </div>

            {/* Request Type */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-request-type" className={LABEL_CLASS}>
                <span>
                  Request type<span className="text-saffron ml-1">*</span>
                </span>
              </label>
              <select
                id="contact-request-type"
                required
                value={requestType}
                onChange={(e) => setRequestType(e.target.value as RequestType)}
                className={`${CONTROL_BASE} cursor-pointer appearance-none bg-no-repeat bg-[right_16px_center] bg-[length:16px] pr-11 [&_option]:bg-[#141418] [&_option]:text-cream`}
                style={{ backgroundImage: SELECT_CHEVRON }}
              >
                {REQUEST_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className={LABEL_CLASS}>
                <span>
                  Message<span className="text-saffron ml-1">*</span>
                </span>
                <span className="font-mono text-[11px] font-normal text-[rgba(251,241,220,0.55)] tracking-normal">
                  {message.length} / 2000
                </span>
              </label>
              <textarea
                id="contact-message"
                required
                maxLength={2000}
                rows={6}
                placeholder="Tell us what you need..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${CONTROL_BASE} min-h-[140px] resize-y`}
              />
            </div>

            {/* Consent Line */}
            <div className="font-sans text-[13px] leading-[1.6] text-[rgba(251,241,220,0.72)] -mt-1">
              By submitting, you agree to our{' '}
              <TransitionLink
                to="/privacy"
                className="text-saffron underline underline-offset-[3px] transition-opacity duration-200 hover:opacity-80"
              >
                Privacy Policy
              </TransitionLink>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-saffron text-black border-0 rounded-[6px] py-4 px-8 font-display text-[18px] uppercase tracking-[0.05em] font-bold cursor-pointer transition-[transform,filter,opacity,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] self-start min-w-[180px] text-center relative overflow-hidden shadow-[0_8px_24px_rgba(255,138,31,0.18)] hover:not-disabled:brightness-[1.08] hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_12px_30px_rgba(255,138,31,0.28)] active:not-disabled:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed max-[640px]:w-full"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};
