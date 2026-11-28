import React, { useState, useRef, useEffect } from 'react';
import { Toast, type ToastData } from '../Toast/Toast';

interface WaitlistFormProps {
  source?: string;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ source = 'website' }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'lifter' | 'home_cook' | 'coach'>('lifter');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [toast, setToast] = useState<ToastData | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const validateEmail = (val: string) => {
    return val.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trap honeypot bots silently
    if (honeypot) {
      if (isMountedRef.current) setStatus('success');
      return;
    }

    if (!validateEmail(email)) {
      if (isMountedRef.current) {
        setStatus('error');
        setErrorMessage('Please enter a valid email address.');
        setToast({
          id: `val-${Date.now()}`,
          type: 'error',
          title: 'Error',
          message: 'Please enter a valid email address.',
          autoClose: true
        });
      }
      return;
    }

    // Client rate limit check
    try {
      const lastSubmitTime = localStorage.getItem('maxiii_last_submit');
      if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime, 10) < 5000) {
        if (isMountedRef.current) {
          setStatus('error');
          setErrorMessage('Please wait a moment before submitting again.');
          setToast({
            id: `rate-${Date.now()}`,
            type: 'error',
            title: 'Error',
            message: 'Please wait a moment before submitting again.',
            autoClose: true
          });
        }
        return;
      }
    } catch {
      // Ignore storage read restrictions
    }

    const cleanEmail = email.trim().toLowerCase();

    if (isMountedRef.current) {
      setStatus('loading');
      setErrorMessage('');
      setToast({
        id: 'waitlist-submit',
        type: 'trying',
        title: 'Joining',
        message: 'Adding you to the waitlist...',
        autoClose: false
      });
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, role, source, website_url_hp: honeypot })
      });

      let data: { code?: string; message?: string } = {};
      try {
        data = await response.json();
      } catch {
        // Non-JSON error response
      }

      if (response.status === 200 || response.status === 201) {
        try {
          localStorage.setItem('maxiii_last_submit', Date.now().toString());
        } catch {
          // ignore storage restrictions
        }
        if (isMountedRef.current) {
          setStatus('success');
          setToast({
            id: 'waitlist-submit',
            type: 'success',
            title: 'Success',
            message: 'We will send updates to you, buddy!',
            autoClose: true
          });
        }
      } else if (response.status === 409 || data.code === 'DUPLICATE') {
        if (isMountedRef.current) {
          setStatus('duplicate');
          setToast({
            id: 'waitlist-submit',
            type: 'duplicate',
            title: 'Success',
            message: 'We will send updates to you, buddy!',
            autoClose: true
          });
        }
      } else {
        const failureText = data.message || 'Something went wrong. Please try again.';
        if (isMountedRef.current) {
          setStatus('error');
          setErrorMessage(failureText);
          setToast({
            id: 'waitlist-submit',
            type: 'error',
            title: 'Error',
            message: failureText,
            autoClose: true
          });
        }
      }
    } catch {
      const genericErr = 'Unable to register at this time. Please try again shortly.';
      if (isMountedRef.current) {
        setStatus('error');
        setErrorMessage(genericErr);
        setToast({
          id: 'waitlist-submit',
          type: 'error',
          title: 'Error',
          message: genericErr,
          autoClose: true
        });
      }
    }
  };

  const roleBtnBase =
    'border-[1.5px] font-sans text-[13px] font-semibold py-2 px-4 rounded-[4px] cursor-pointer transition-all duration-200 text-center';
  const roleBtnIdle = 'bg-[rgba(251,241,220,0.15)] border-[rgba(251,241,220,0.4)] text-cream';
  const roleBtnSelected = 'bg-cream text-black border-cream';

  return (
    <div className="w-full max-w-[580px] mx-auto">
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      <div className="flex justify-center items-center gap-2 mb-6 flex-wrap" role="radiogroup" aria-label="I am primarily a">
        <button
          type="button"
          role="radio"
          aria-checked={role === 'lifter'}
          className={`${roleBtnBase} ${role === 'lifter' ? roleBtnSelected : roleBtnIdle}`}
          onClick={() => setRole('lifter')}
        >
          Lifter / Gym-Goer
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={role === 'home_cook'}
          className={`${roleBtnBase} ${role === 'home_cook' ? roleBtnSelected : roleBtnIdle}`}
          onClick={() => setRole('home_cook')}
        >
          Home Cook / Everyday
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={role === 'coach'}
          className={`${roleBtnBase} ${role === 'coach' ? roleBtnSelected : roleBtnIdle}`}
          onClick={() => setRole('coach')}
        >
          Coach / Trainer
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot field for bot spam */}
        <input
          type="text"
          name="website_url_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          maxLength={100}
          className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-[1] pointer-events-none"
          aria-hidden="true"
        />

        <div className="flex gap-2.5 relative max-[600px]:flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            maxLength={254}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 bg-cream text-black border-2 border-transparent py-[18px] px-6 rounded-[4px] font-sans text-[16px] font-medium outline-none transition-[border-color,box-shadow] duration-200 focus:border-black focus:shadow-[0_0_0_4px_rgba(255,138,31,0.3)]"
            aria-label="Email address for waitlist"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-black text-cream border-2 border-black py-[18px] px-9 max-[600px]:w-full max-[600px]:p-4 rounded-[4px] font-display text-[18px] uppercase tracking-[0.05em] cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap relative overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:not-disabled:bg-saffron hover:not-disabled:border-saffron hover:not-disabled:text-black hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_12px_28px_rgba(0,0,0,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Joining...' : 'Join the waitlist'}
          </button>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {status === 'loading' && (
            <div className="mt-4 py-[14px] px-5 rounded-[12px] text-[14px] font-semibold leading-[1.5] bg-[rgba(251,241,220,0.15)] text-cream border-[1.5px] border-dashed border-[rgba(251,241,220,0.4)] flex items-center gap-2.5">
              Adding you to the waitlist...
            </div>
          )}

          {status === 'success' && (
            <div className="mt-4 py-[14px] px-5 rounded-[12px] text-[14px] font-semibold leading-[1.5] bg-[rgba(251,241,220,0.95)] text-black border-2 border-black">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: '-1px' }} aria-hidden="true">
                <polyline points="3 8.5 6.5 12 13 4" />
              </svg>
              We will send updates to you, buddy!
            </div>
          )}

          {status === 'duplicate' && (
            <div className="mt-4 py-[14px] px-5 rounded-[12px] text-[14px] font-semibold leading-[1.5] bg-[rgba(251,241,220,0.95)] text-black border-2 border-black">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: '-1px' }} aria-hidden="true">
                <polyline points="3 8.5 6.5 12 13 4" />
              </svg>
              We will send updates to you, buddy!
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 py-[14px] px-5 rounded-[12px] text-[14px] font-semibold leading-[1.5] bg-[#FFE4E6] text-[#9F1239] border-2 border-[#E11D48]">
              {errorMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
