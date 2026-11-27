import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../../motion/tokens';
import { WebGLHeroMoon } from '../../components/WebGL/WebGLHeroMoon';
import { MagneticButton } from '../../components/Button/MagneticButton';
import maxiiiCreamPng from '../../assets/maxiii-cream.png';
import maxiiiCreamWebp from '../../assets/maxiii-cream.webp';

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLSpanElement>(null);
  const narrativeRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
          0.1
        );
      }

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, ease: 'power3.out' },
          0.35
        );
      }

      if (narrativeRef.current) {
        tl.fromTo(
          narrativeRef.current,
          { opacity: 0, y: 15 },
          { opacity: 0.95, y: 0, duration: 0.8 },
          0.55
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.7
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-svh bg-cobalt text-cream flex flex-col justify-between pt-[calc(90px+env(safe-area-inset-top))] px-10 pb-[calc(48px+env(safe-area-inset-bottom))] max-[900px]:pt-[calc(76px+env(safe-area-inset-top))] max-[900px]:px-6 max-[600px]:pt-[calc(68px+env(safe-area-inset-top))] max-[600px]:px-5 max-[900px]:pb-[calc(44px+env(safe-area-inset-bottom))] max-[600px]:pb-[calc(32px+env(safe-area-inset-bottom))] overflow-hidden box-border"
      aria-label="Hero Poster"
    >
      {/* Center Artwork: Halftone Moon + Wordmark */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[46vh] max-[900px]:min-h-[36vh] max-[600px]:min-h-[28vh]" data-motion="giant-type">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(85vw,680px)] h-[min(85vw,680px)] max-[900px]:w-[min(74vw,460px)] max-[900px]:h-[min(74vw,460px)] z-[1] pointer-events-none opacity-95">
          <WebGLHeroMoon />
        </div>

        <div className="w-full flex items-center justify-center relative z-[5] pointer-events-none">
          <picture className="w-full flex justify-center">
            <source srcSet={maxiiiCreamWebp} type="image/webp" />
            <img
              ref={logoRef}
              src={maxiiiCreamPng}
              alt="MAXIII"
              className="w-[min(92vw,940px)] h-auto max-h-[min(280px,34vh)] max-[900px]:max-h-[min(200px,24vh)] aspect-[1756/516] object-contain block select-none will-change-[transform,opacity]"
              width={1756}
              height={516}
              decoding="async"
              {...({ fetchpriority: 'high' } as React.ImgHTMLAttributes<HTMLImageElement>)}
            />
          </picture>
        </div>
      </div>

      {/* Editorial Blocks */}
      <div className="grid grid-cols-[1.2fr_1fr] max-[900px]:grid-cols-1 gap-12 max-[900px]:gap-5 items-end mt-4 relative z-10" data-motion="supporting-text">
        <h1 className="font-serif italic text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.08] tracking-[-0.02em] text-cream m-0">
          <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <span ref={headlineRef} className="inline-block will-change-transform">
              "Count what you actually eat."
            </span>
          </span>
        </h1>

        <div className="flex flex-col gap-5">
          <p ref={narrativeRef} className="font-serif text-[clamp(1.02rem,1.25vw,1.2rem)] leading-[1.48] opacity-95 max-w-[500px] m-0">
            Maximise your gains every calorie and macro counted properly, so you know exactly what&apos;s on your plate.
          </p>

          <div ref={ctaRef} className="flex items-center gap-5 flex-wrap will-change-[transform,opacity]">
            <MagneticButton to="/#join">
              Join the waitlist
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
