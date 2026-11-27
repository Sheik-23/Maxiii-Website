import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../motion/tokens';
import { HalftoneMoon } from '../../components/HalftoneMoon/HalftoneMoon';

gsap.registerPlugin(ScrollTrigger);

export const AdaptiveTargetScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const wordMovesRef = useRef<HTMLSpanElement>(null);
  const wordsFollowerRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (copyRef.current) {
        gsap.fromTo(
          copyRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 0.92,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      if (wordMovesRef.current) {
        gsap.to(wordMovesRef.current, {
          xPercent: 24,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.2
          }
        });
      }

      if (wordsFollowerRef.current) {
        gsap.to(wordsFollowerRef.current, {
          xPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-svh bg-black text-cream overflow-hidden box-border flex items-center justify-center py-[clamp(60px,8vw,100px)] px-[clamp(24px,5vw,64px)]"
      aria-label="Your target moves when you do."
    >
      {/* Layer 1: Words behind the moon with "moves" drifting */}
      <div className="absolute top-[14%] left-[4vw] w-[92vw] max-[900px]:top-[10%] z-[1] pointer-events-none select-none" data-motion="giant-type">
        <h2 className="font-serif italic text-[clamp(3.8rem,11vw,11rem)] max-[900px]:text-[clamp(2.4rem,9.5vw,5.2rem)] leading-[0.9] tracking-[-0.03em] text-cream m-0 whitespace-nowrap" aria-label="Your target moves when you do.">
          <span>Your target </span>
          <span ref={wordMovesRef} className="inline-block will-change-transform text-cream">
            moves
          </span>
        </h2>
      </div>

      {/* Layer 2: Massive Halftone Moon overlapping and rotating in scroll */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-auto flex items-center justify-center w-[min(85vw,680px)] h-[min(85vw,680px)] max-[900px]:w-[min(76vw,460px)] max-[900px]:h-[min(76vw,460px)] max-md:w-[320px] max-md:h-[320px]"
        data-cursor="view"
        data-motion="moon"
      >
        <HalftoneMoon size={680} rotateOnScroll={true} className="!w-full !h-full !max-w-none" />
      </div>

      {/* Layer 3: Words in front of the moon following with lag */}
      <div className="absolute bottom-[15%] right-[5vw] max-[900px]:bottom-[20%] max-[900px]:right-[4vw] z-[3] pointer-events-none select-none" data-motion="giant-type">
        <span className="font-serif italic text-[clamp(3.8rem,11vw,11rem)] max-[900px]:text-[clamp(2.4rem,9.5vw,5.2rem)] leading-[0.9] tracking-[-0.03em] text-cream block whitespace-nowrap [text-shadow:0_4px_30px_rgba(0,0,0,0.9)]">
          <span ref={wordsFollowerRef} className="inline-block will-change-transform">
            when you do.
          </span>
        </span>
      </div>

      {/* Layer 4: Off-centre supporting text block */}
      <div className="absolute bottom-[clamp(30px,6vw,60px)] left-[clamp(24px,6vw,80px)] max-md:bottom-6 max-md:left-5 max-md:max-w-[290px] z-[4] max-w-[440px]" data-motion="supporting-text">
        <p ref={copyRef} className="font-serif text-[clamp(1.1rem,1.6vw,1.4rem)] max-md:text-[1rem] leading-[1.55] max-md:leading-[1.45] text-cream opacity-[0.92] m-0">
          Your daily calorie target adjusts as your weight trend changes, so the plan keeps pace with your progress.
        </p>
      </div>
    </section>
  );
};
