import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../motion/tokens';

gsap.registerPlugin(ScrollTrigger);

const ROW_CLASS = 'flex items-center gap-[clamp(24px,4vw,48px)] whitespace-nowrap will-change-transform';
const WORD_FILLED_CLASS =
  'font-display text-[clamp(4.5rem,13vw,12rem)] max-md:text-[clamp(3.2rem,15vw,5.5rem)] leading-[0.9] tracking-[-0.02em] uppercase text-cream transition-[color,-webkit-text-stroke] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]';
const WORD_OUTLINED_CLASS =
  'js-outlined-word font-display text-[clamp(4.5rem,13vw,12rem)] max-md:text-[clamp(3.2rem,15vw,5.5rem)] leading-[0.9] tracking-[-0.02em] uppercase text-transparent [-webkit-text-stroke:2px_#FBF1DC] max-md:[-webkit-text-stroke:1.5px_#FBF1DC] transition-[color,-webkit-text-stroke] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-[settle=true]:!text-cream data-[settle=true]:![-webkit-text-stroke:0px_transparent]';
const DOT_CLASS = 'font-display text-[clamp(3rem,8vw,8rem)] text-saffron';

export const TrainingFloorScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const row4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      if (row1Ref.current) {
        tl.fromTo(
          row1Ref.current,
          { xPercent: -25, y: -24, opacity: 0.6 },
          { xPercent: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0
        );
      }

      if (row2Ref.current) {
        tl.fromTo(
          row2Ref.current,
          { xPercent: 25, y: -24, opacity: 0.6 },
          { xPercent: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.06
        );

        tl.call(() => {
          const words = row2Ref.current?.querySelectorAll('.js-outlined-word');
          words?.forEach((w) => w.setAttribute('data-settle', 'true'));
        }, undefined, 0.75);
      }

      if (row3Ref.current) {
        tl.fromTo(
          row3Ref.current,
          { xPercent: -25, y: -24, opacity: 0.6 },
          { xPercent: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.12
        );
      }

      if (row4Ref.current) {
        tl.fromTo(
          row4Ref.current,
          { xPercent: 25, y: -24, opacity: 0.6 },
          { xPercent: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.18
        );

        tl.call(() => {
          const words = row4Ref.current?.querySelectorAll('.js-outlined-word');
          words?.forEach((w) => w.setAttribute('data-settle', 'true'));
        }, undefined, 0.85);
      }

      const scrollConfig = {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      };

      if (row1Ref.current) gsap.to(row1Ref.current, { xPercent: -14, ease: 'none', scrollTrigger: scrollConfig });
      if (row2Ref.current) gsap.to(row2Ref.current, { xPercent: 12, ease: 'none', scrollTrigger: scrollConfig });
      if (row3Ref.current) gsap.to(row3Ref.current, { xPercent: -18, ease: 'none', scrollTrigger: scrollConfig });
      if (row4Ref.current) gsap.to(row4Ref.current, { xPercent: 10, ease: 'none', scrollTrigger: scrollConfig });

      const copyLines = containerRef.current?.querySelectorAll('.js-copy-line');
      if (copyLines && copyLines.length > 0) {
        tl.fromTo(
          copyLines,
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 0.95, duration: 0.8, stagger: 0.06, ease: 'power3.out' },
          0.3
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-svh bg-cobalt text-cream overflow-hidden box-border flex flex-col justify-end pt-[clamp(64px,7vw,96px)] pb-[clamp(64px,8vw,108px)] px-[clamp(24px,5vw,64px)] max-[900px]:pt-[76px] max-[900px]:px-6 max-[600px]:px-5 max-[900px]:pb-16"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 85% 70% at 50% 40%, rgba(32, 58, 245, 0.55) 0%, rgba(20, 40, 208, 0.96) 60%, #0b188a 100%)'
      }}
      aria-label="Fuel the lift Poster"
    >
      <div className="absolute inset-x-0 top-0 bottom-[26%] flex flex-col justify-evenly pointer-events-none select-none z-[1] opacity-90" data-motion="giant-type">
        <div ref={row1Ref} className={ROW_CLASS}>
          <span className={WORD_FILLED_CLASS}>Fuel the lift</span>
          <span className={DOT_CLASS}>•</span>
          <span className={WORD_FILLED_CLASS}>Fuel the lift</span>
        </div>

        <div ref={row2Ref} className={ROW_CLASS}>
          <span className={WORD_OUTLINED_CLASS}>Fuel the lift</span>
          <span className={DOT_CLASS}>•</span>
          <span className={WORD_OUTLINED_CLASS}>Fuel the lift</span>
        </div>

        <div ref={row3Ref} className={ROW_CLASS}>
          <span className={WORD_FILLED_CLASS}>Fuel the lift</span>
          <span className={DOT_CLASS}>•</span>
          <span className={WORD_FILLED_CLASS}>Fuel the lift</span>
        </div>

        <div ref={row4Ref} className={ROW_CLASS}>
          <span className={WORD_OUTLINED_CLASS}>Fuel the lift</span>
          <span className={DOT_CLASS}>•</span>
          <span className={WORD_OUTLINED_CLASS}>Fuel the lift</span>
        </div>
      </div>

      {/* Smooth cobalt scrim rising behind the editorial footer band */}
      <div
        className="absolute inset-x-0 bottom-0 h-[48%] pointer-events-none z-[2] bg-gradient-to-t from-[#09157a] via-[#0b188a]/95 to-transparent"
        aria-hidden="true"
      />

      {/* Editorial Copy Block matching Hero / Macros / Adaptive posters */}
      <div
        className="relative z-[3] grid grid-cols-[1.15fr_1fr] max-[900px]:grid-cols-1 gap-8 max-[900px]:gap-4 items-end w-full"
        data-motion="supporting-text"
      >
        <h2 className="js-copy-line font-serif italic text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em] text-cream m-0">
          "Built for lifters, not guesswork."
        </h2>
        <p className="js-copy-line font-serif text-[clamp(1.08rem,1.5vw,1.35rem)] max-[900px]:text-[1.06rem] leading-[1.52] text-cream/95 max-w-[500px] m-0">
          Hit daily protein for recovery, pair carbs with fibre for output, and log meals right on the gym floor without slowing down.
        </p>
      </div>
    </section>
  );
};
