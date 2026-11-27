import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../motion/tokens';

gsap.registerPlugin(ScrollTrigger);

export interface PosterLayerProps {
  id?: string;
  backgroundColor: string;
  textColor: string;
  folioLeft?: React.ReactNode;
  folioRight?: React.ReactNode;
  giantWord: string | React.ReactNode;
  giantWordOutline?: boolean;
  subject?: React.ReactNode;
  foregroundContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const PosterLayer: React.FC<PosterLayerProps> = ({
  id,
  backgroundColor,
  textColor,
  folioLeft,
  folioRight,
  giantWord,
  giantWordOutline = false,
  subject,
  foregroundContent,
  footerContent,
  className = '',
  ariaLabel
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (typeRef.current) {
        gsap.to(typeRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      if (subjectRef.current) {
        gsap.to(subjectRef.current, {
          yPercent: -12,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative w-full min-h-svh flex flex-col justify-between pt-[calc(90px+env(safe-area-inset-top))] px-10 pb-[calc(48px+env(safe-area-inset-bottom))] max-md:pt-[calc(80px+env(safe-area-inset-top))] max-md:px-5 max-md:pb-[calc(36px+env(safe-area-inset-bottom))] max-md:min-h-screen overflow-hidden box-border ${className}`}
      style={{ backgroundColor, color: textColor }}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ backgroundColor }} />

      {(folioLeft || folioRight) && (
        <header className="relative z-10 flex justify-between items-center border-b-2 border-current pb-3.5 font-sans text-[13px] font-bold tracking-[0.08em] uppercase opacity-85">
          <div>{folioLeft}</div>
          <div>{folioRight}</div>
        </header>
      )}

      <div className="relative flex-1 flex items-center justify-center w-full my-8">
        <div
          ref={typeRef}
          className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none select-none whitespace-nowrap will-change-transform"
        >
          <div
            className={`font-display text-[clamp(4.5rem,18vw,19rem)] leading-[0.82] uppercase tracking-[-0.03em] text-center ${
              giantWordOutline
                ? '[-webkit-text-stroke:3px_currentColor] max-md:[-webkit-text-stroke:1.5px_currentColor] text-transparent opacity-45'
                : 'text-inherit opacity-95'
            }`}
          >
            {giantWord}
          </div>
        </div>

        {subject && (
          <div
            ref={subjectRef}
            className="relative z-[4] flex items-center justify-center max-w-[90%] max-h-[70svh] will-change-transform"
          >
            {subject}
          </div>
        )}
      </div>

      {foregroundContent && (
        <div className="relative z-[6] w-full max-w-[1320px] mx-auto">
          {foregroundContent}
        </div>
      )}

      {footerContent && (
        <footer className="relative z-10 flex justify-between items-end pt-6 border-t border-current max-md:flex-col max-md:items-start max-md:gap-4">
          {footerContent}
        </footer>
      )}
    </section>
  );
};
