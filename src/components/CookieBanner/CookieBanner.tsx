import React, { useState, useEffect } from 'react';
import { TransitionLink } from '../../transitions/TransitionLink';

const STORAGE_KEY = 'maxiii_cookie_consent';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage may be unavailable or blocked
    }

    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleReopen = () => {
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-banner', handleReopen);
    return () => window.removeEventListener('open-cookie-banner', handleReopen);
  }, []);

  const handleChoice = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Ignore storage error
    }
    setIsVisible(false);

    if (choice === 'accepted') {
      window.dispatchEvent(new CustomEvent('analytics-consent-granted'));
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 right-6 z-[99980] flex justify-center pointer-events-none max-[680px]:bottom-4 max-[680px]:left-4 max-[680px]:right-4"
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="pointer-events-auto max-w-[840px] w-full bg-[rgba(20,20,24,0.96)] backdrop-blur-md border border-[rgba(251,241,220,0.16)] rounded-[16px] py-4 px-6 flex items-center justify-between gap-6 shadow-[0_12px_36px_rgba(0,0,0,0.45)] max-[680px]:flex-col max-[680px]:items-stretch max-[680px]:py-4 max-[680px]:px-[18px] max-[680px]:gap-4">
        <p className="font-sans text-[13.5px] leading-[1.55] text-cream m-0 flex-1 max-[680px]:text-[13px]">
          We use essential cookies to make MAXIII work. With your permission, we also use analytics to improve your experience. See our{' '}
          <TransitionLink
            to="/cookie-policy"
            className="text-saffron underline underline-offset-[3px] transition-opacity duration-200 hover:opacity-80"
          >
            Cookie Policy
          </TransitionLink>.
        </p>
        <div className="flex items-center gap-[10px] shrink-0 max-[680px]:justify-end">
          <button
            type="button"
            className="bg-transparent text-cream border border-[rgba(251,241,220,0.28)] rounded-full py-2 px-4 font-sans text-[13px] font-medium cursor-pointer transition-[background-color,border-color] duration-200 hover:bg-[rgba(251,241,220,0.1)] hover:border-[rgba(251,241,220,0.5)] max-[680px]:flex-1 max-[680px]:text-center max-[680px]:py-[9px] max-[680px]:px-4"
            onClick={() => handleChoice('declined')}
          >
            Decline
          </button>
          <button
            type="button"
            className="bg-saffron text-black border border-saffron rounded-full py-2 px-[18px] font-sans text-[13px] font-semibold cursor-pointer transition-[transform,opacity] duration-150 hover:opacity-[0.92] hover:-translate-y-px max-[680px]:flex-1 max-[680px]:text-center max-[680px]:py-[9px] max-[680px]:px-4"
            onClick={() => handleChoice('accepted')}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
