import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../motion/tokens';
import { WaitlistForm } from '../../components/WaitlistForm/WaitlistForm';

gsap.registerPlugin(ScrollTrigger);

interface JoinSceneProps {
  isPage?: boolean;
}

export const JoinScene: React.FC<JoinSceneProps> = ({ isPage = false }) => {
  const containerRef = useRef<HTMLElement>(null);
  const trialLineRef = useRef<HTMLParagraphElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);

  const startLetters = ['S', 'T', 'A', 'R', 'T'];

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const letters = containerRef.current?.querySelectorAll('.js-start-letter');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      if (letters && letters.length > 0) {
        letters.forEach((l, idx) => {
          tl.fromTo(
            l,
            { y: -100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power3.out',
              onComplete: () => {
                gsap.fromTo(
                  l,
                  { scaleY: 0.94, scaleX: 1.04 },
                  { scaleY: 1, scaleX: 1, duration: 0.14, ease: 'power1.out' }
                );
              }
            },
            idx * 0.06
          );
        });
      }

      if (trialLineRef.current) {
        tl.fromTo(
          trialLineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.35
        );
      }

      if (formWrapRef.current) {
        tl.fromTo(
          formWrapRef.current,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.45
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const Component = isPage ? 'main' : 'section';

  const headingClass =
    'font-display text-[clamp(6rem,20vw,18rem)] uppercase leading-[0.88] tracking-[0.04em] text-cream mb-6 flex justify-center items-center gap-[clamp(4px,1vw,12px)]';
  const letterClass = 'js-start-letter inline-block will-change-[transform,opacity] origin-bottom';

  return (
    <Component
      ref={containerRef}
      className="relative w-full min-h-svh bg-deep-red text-cream pt-[100px] px-10 pb-[60px] max-[860px]:pt-20 max-[860px]:px-5 max-[860px]:pb-10 flex flex-col justify-center items-center box-border"
      id={isPage ? 'join' : undefined}
      aria-label="Join Waitlist"
      style={isPage ? { minHeight: '100svh', paddingTop: '140px' } : undefined}
    >
      <div className="w-full max-w-[900px] text-center">
        {isPage ? (
          <h1 className={headingClass} data-motion="giant-type">
            {startLetters.map((l, i) => (
              <span key={i} className={letterClass}>
                {l}
              </span>
            ))}
          </h1>
        ) : (
          <h2 className={headingClass} data-motion="giant-type">
            {startLetters.map((l, i) => (
              <span key={i} className={letterClass}>
                {l}
              </span>
            ))}
          </h2>
        )}

        <p
          ref={trialLineRef}
          className="font-serif italic text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.3] text-cream mb-10 max-w-[720px] mx-auto will-change-[transform,opacity]"
          data-motion="supporting-text"
        >
          Try Maxiii and maximise your gains
        </p>

        <div ref={formWrapRef} className="mt-6 will-change-[transform,opacity]" data-motion="supporting-text">
          <WaitlistForm source={isPage ? 'direct_join_page' : 'homepage_join_scene'} />
        </div>
      </div>
    </Component>
  );
};
