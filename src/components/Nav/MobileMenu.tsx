import React, { useEffect, useRef } from 'react';
import maxiiiCreamPng from '../../assets/maxiii-cream.png';
import maxiiiCreamWebp from '../../assets/maxiii-cream.webp';
import { TransitionLink } from '../../transitions/TransitionLink';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const MENU_DELAYS = ['0.10s', '0.16s', '0.22s', '0.28s', '0.34s'];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, triggerRef }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        if (triggerRef.current) triggerRef.current.focus();
      }

      if (e.key === 'Tab' && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  const handleLinkClick = () => {
    onClose();
    if (triggerRef.current) triggerRef.current.focus();
  };

  const navItemClass = `${
    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
  } transition-[opacity,transform] duration-[400ms] ease-[var(--ease-expo)]`;

  const bigLinkClass =
    'font-display text-[clamp(2.5rem,9.5vw,4.5rem)] md:text-[clamp(3.2rem,7vw,4.8rem)] leading-[0.96] uppercase no-underline text-black inline-flex items-baseline justify-between w-full py-1.5 tracking-[-0.02em] transition-colors duration-200 hover:text-cobalt active:text-cobalt';

  const legalLinkClass =
    'font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-black/75 no-underline py-2 transition-colors duration-200 hover:text-cobalt active:text-cobalt';

  return (
    <div
      id="mobile-menu"
      ref={overlayRef}
      className={`fixed inset-0 z-[99985] bg-cream text-black flex flex-col justify-between overflow-y-auto overscroll-contain pt-[calc(20px+env(safe-area-inset-top))] px-6 md:px-10 pb-[calc(28px+env(safe-area-inset-bottom))] transition-[clip-path,opacity] duration-[500ms] ease-[var(--ease-expo)] ${
        isOpen ? 'pointer-events-auto opacity-100 visible' : 'pointer-events-none opacity-0 invisible'
      }`}
      style={{
        clipPath: isOpen
          ? 'circle(150% at calc(100% - 40px) 40px)'
          : 'circle(0% at calc(100% - 40px) 40px)'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      aria-hidden={!isOpen}
    >
      <div className="flex justify-between items-center border-b border-black/12 pb-4">
        <TransitionLink to="/" className="flex items-center no-underline min-h-[44px]" onClick={onClose} aria-label="MAXIII Home">
          <picture>
            <source srcSet={maxiiiCreamWebp} type="image/webp" />
            <img
              src={maxiiiCreamPng}
              alt="MAXIII"
              className="h-7 md:h-8 w-auto block object-contain brightness-0"
              width={109}
              height={32}
              decoding="async"
            />
          </picture>
        </TransitionLink>
        <button
          ref={firstFocusableRef}
          type="button"
          onClick={() => {
            onClose();
            if (triggerRef.current) triggerRef.current.focus();
          }}
          className="bg-transparent border-[1.5px] border-black text-black font-sans text-[13px] font-bold tracking-[0.08em] uppercase min-h-[44px] px-4 rounded-full cursor-pointer inline-flex items-center gap-2 transition-[background-color,color,transform] duration-200 hover:bg-black hover:text-cream active:scale-95"
          aria-label="Close navigation menu"
        >
          <span>Close</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="2" y1="2" x2="12" y2="12" />
            <line x1="12" y1="2" x2="2" y2="12" />
          </svg>
        </button>
      </div>

      <nav aria-label="Mobile Navigation" className="my-auto py-6">
        <ul className="list-none flex flex-col gap-[clamp(10px,2vh,20px)] p-0">
          <li className={navItemClass} style={{ transitionDelay: isOpen ? MENU_DELAYS[0] : '0s' }}>
            <TransitionLink to="/" onClick={handleLinkClick} className={bigLinkClass}>
              <span>Overview</span>
              <span className="font-mono text-[16px] opacity-40" aria-hidden="true">↗</span>
            </TransitionLink>
          </li>
          <li className={navItemClass} style={{ transitionDelay: isOpen ? MENU_DELAYS[1] : '0s' }}>
            <TransitionLink to="/features" onClick={handleLinkClick} className={bigLinkClass}>
              <span>Features</span>
              <span className="font-mono text-[16px] opacity-40" aria-hidden="true">↗</span>
            </TransitionLink>
          </li>
          <li className={navItemClass} style={{ transitionDelay: isOpen ? MENU_DELAYS[2] : '0s' }}>
            <TransitionLink to="/#join" onClick={handleLinkClick} className={bigLinkClass}>
              <span>Join the waitlist</span>
              <span className="font-mono text-[16px] opacity-40" aria-hidden="true">↗</span>
            </TransitionLink>
          </li>
          <li className={navItemClass} style={{ transitionDelay: isOpen ? MENU_DELAYS[3] : '0s' }}>
            <TransitionLink to="/contact" onClick={handleLinkClick} className={bigLinkClass}>
              <span>Contact</span>
              <span className="font-mono text-[16px] opacity-40" aria-hidden="true">↗</span>
            </TransitionLink>
          </li>
        </ul>

        <div
          className={`${navItemClass} flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 pt-5 border-t border-black/12`}
          style={{ transitionDelay: isOpen ? MENU_DELAYS[4] : '0s' }}
        >
          <TransitionLink to="/privacy" onClick={handleLinkClick} className={legalLinkClass}>
            Privacy Policy
          </TransitionLink>
          <TransitionLink to="/terms" onClick={handleLinkClick} className={legalLinkClass}>
            Terms
          </TransitionLink>
          <TransitionLink to="/cookie-policy" onClick={handleLinkClick} className={legalLinkClass}>
            Cookie Policy
          </TransitionLink>
        </div>
      </nav>

      <div className="border-t border-black/15 pt-4 font-sans text-[13px] text-black opacity-80 flex justify-between items-center">
        <span>MAXIII</span>
        <span>Calorie and macro tracker</span>
      </div>
    </div>
  );
};
