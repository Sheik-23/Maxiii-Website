import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../motion/tokens';
import maxiiiCreamPng from '../../assets/maxiii-cream.png';
import maxiiiCreamWebp from '../../assets/maxiii-cream.webp';
import { TransitionLink } from '../../transitions/TransitionLink';

gsap.registerPlugin(ScrollTrigger);

const linkClass =
  'font-sans text-[14px] text-cream no-underline opacity-80 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-saffron';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !footerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      if (logoWrapRef.current) {
        tl.fromTo(
          logoWrapRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-black text-cream pt-20 px-10 pb-10 max-md:pt-[60px] max-md:px-5 max-md:pb-[30px] border-t border-[rgba(251,241,220,0.1)]"
      role="contentinfo"
    >
      <div className="max-w-[1320px] mx-auto">
        <div className="flex justify-between items-start flex-wrap gap-12 mb-16">
          <div className="max-w-[380px]">
            <div ref={logoWrapRef}>
              <picture>
                <source srcSet={maxiiiCreamWebp} type="image/webp" />
                <img
                  src={maxiiiCreamPng}
                  alt="MAXIII"
                  className="h-[38px] w-auto block object-contain"
                  width={129}
                  height={38}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <p className="font-serif italic text-[20px] leading-[1.4] mt-5 opacity-90">
              maximise your gains
            </p>
          </div>

          <div className="flex gap-[60px] max-md:gap-9 flex-wrap">
            <div>
              <h4 className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-saffron mb-4">
                Navigation
              </h4>
              <ul className="list-none flex flex-col gap-3">
                <li><TransitionLink to="/" className={linkClass}>Overview</TransitionLink></li>
                <li><TransitionLink to="/features" className={linkClass}>Features</TransitionLink></li>
                <li><TransitionLink to="/#join" className={linkClass}>Join the waitlist</TransitionLink></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-saffron mb-4">
                Legal
              </h4>
              <ul className="list-none flex flex-col gap-3">
                <li><TransitionLink to="/privacy" className={linkClass}>Privacy Policy</TransitionLink></li>
                <li><TransitionLink to="/terms" className={linkClass}>Terms and Conditions</TransitionLink></li>
                <li><TransitionLink to="/cookie-policy" className={linkClass}>Cookie Policy</TransitionLink></li>
                <li><TransitionLink to="/contact" className={linkClass}>Contact</TransitionLink></li>
                <li>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-banner'))}
                    className="bg-transparent border-0 p-0 font-sans text-[14px] text-cream no-underline opacity-80 cursor-pointer text-left transition-[opacity,color] duration-200 hover:opacity-100 hover:text-saffron"
                  >
                    Cookie settings
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(251,241,220,0.15)] pt-7 flex justify-between items-center flex-wrap gap-4 text-[13px] opacity-65">
          <div>&copy; MAXIII. All rights reserved.</div>
          <div className="font-mono text-[12px]">maxiii.app</div>
        </div>
      </div>
    </footer>
  );
};
