import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import maxiiiPng from '../../assets/maxiii-logo-transparent.png';
import maxiiiWebp from '../../assets/maxiii-logo-transparent.webp';
import { MobileMenu } from './MobileMenu';
import { TransitionLink } from '../../transitions/TransitionLink';

export const Navbar: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const norm = location.pathname.replace(/\/+$/, '') || '/';
  const isLegalPage =
    norm === '/privacy' ||
    norm === '/privacy-policy' ||
    norm === '/terms' ||
    norm === '/terms-and-conditions' ||
    norm === '/cookie-policy' ||
    norm === '/contact';

  useEffect(() => {
    // On terms and privacy pages, navbar is fixed (always visible, never hidden on scroll)
    if (isLegalPage) {
      setIsHidden(false);
      setIsDarkTheme(false);
      return;
    }

    let rafId: number | null = null;

    const updateNavbarState = () => {
      rafId = null;
      const currentY = window.scrollY;

      // 1. Hide on scroll down, return on scroll up
      if (currentY > 120 && currentY > lastScrollY.current + 5) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current - 5 || currentY <= 80) {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;

      // 2. Adapt navbar color to the poster behind it
      if (typeof document !== 'undefined') {
        const midX = window.innerWidth / 2;
        const el = document.elementFromPoint(midX, 40);
        const inFooter = el?.closest('footer');
        const section = el?.closest('section[id]');
        if (inFooter) {
          setIsDarkTheme(false);
        } else if (section) {
          const id = section.id;
          // Features (mustard) on Home or light sections require dark navbar
          if (id === 'features' || id === 'feature-macros' || id === 'feature-closing') {
            setIsDarkTheme(true);
          } else {
            setIsDarkTheme(false);
          }
        }
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateNavbarState);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateNavbarState();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [location.pathname, isLegalPage]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 w-full z-[1000] flex items-center justify-between pt-[calc(20px+env(safe-area-inset-top))] px-10 pb-5 max-[860px]:pt-[calc(16px+env(safe-area-inset-top))] max-[860px]:px-5 max-[860px]:pb-4 transition-[transform,color] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
          isHidden && !isLegalPage ? '-translate-y-[110%]' : ''
        } ${isDarkTheme ? '!text-black' : 'text-cream'}`}
        role="banner"
      >
        <TransitionLink
          to="/"
          className="pointer-events-auto flex items-center no-underline text-inherit [--logo-height:32px] max-[860px]:[--logo-height:28px] transition-colors duration-[400ms] focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-4 group"
          aria-label="MAXIII Home"
          data-cursor="link"
        >
          <picture>
            <source srcSet={maxiiiWebp} type="image/webp" />
            <img
              src={maxiiiPng}
              alt="MAXIII"
              className={`h-[var(--logo-height,32px)] w-auto block object-contain transition-[filter,opacity] duration-[400ms] group-hover:opacity-85 ${
                isDarkTheme ? 'brightness-0' : ''
              }`}
              width={109}
              height={32}
              decoding="async"
            />
          </picture>
        </TransitionLink>

        <nav aria-label="Desktop Primary Navigation" className="max-[900px]:hidden">
          <ul className="pointer-events-auto flex items-center gap-9 list-none m-0 p-0">
            <li>
              <TransitionLink
                to="/features"
                className="font-sans text-[14px] font-semibold tracking-[0.05em] uppercase no-underline text-inherit opacity-[0.88] relative py-1.5 transition-[opacity,color] duration-[250ms] hover:opacity-100 focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-saffron after:scale-x-0 after:origin-right after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100 hover:after:origin-left"
                data-cursor="link"
              >
                Features
              </TransitionLink>
            </li>
          </ul>
        </nav>

        <div className="pointer-events-auto flex items-center gap-4 max-[900px]:hidden">
          <TransitionLink
            to="/#join"
            className="inline-flex items-center justify-center py-[10px] px-[22px] rounded-[4px] border-[1.5px] border-current bg-transparent text-inherit font-sans text-[13px] font-bold tracking-[0.06em] uppercase no-underline cursor-pointer transition-[background-color,color,border-color,transform] duration-[250ms] hover:bg-saffron hover:border-saffron hover:!text-black active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-4"
            data-cursor="link"
          >
            Join the waitlist
          </TransitionLink>
        </div>

        <button
          ref={toggleBtnRef}
          type="button"
          className="pointer-events-auto hidden max-[900px]:inline-flex flex-col items-end justify-center gap-[5px] w-11 h-11 -mr-2 rounded-full bg-transparent border-0 cursor-pointer p-2 text-inherit transition-[background-color,transform] duration-200 hover:bg-current/10 active:scale-95 focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          data-cursor="link"
        >
          <span className="block w-6 h-[2px] rounded-full bg-current transition-[transform,background-color] duration-300" />
          <span className="block w-[18px] h-[2px] rounded-full bg-current transition-[transform,background-color,width] duration-300" />
          <span className="block w-6 h-[2px] rounded-full bg-current transition-[transform,background-color] duration-300" />
        </button>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => {
          setMobileMenuOpen(false);
          toggleBtnRef.current?.focus();
        }}
        triggerRef={toggleBtnRef}
      />
    </>
  );
};
