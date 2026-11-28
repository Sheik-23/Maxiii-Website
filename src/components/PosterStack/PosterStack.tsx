import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../motion/tokens';

gsap.registerPlugin(ScrollTrigger);

export interface PosterItem {
  id: string;
  component: React.ReactNode;
  color: string;
}

interface PosterStackProps {
  posters: PosterItem[];
  className?: string;
}

/**
 * Returns a rich, harmonious underlay framing color suitable with the poster's color.
 * When the poster content scales down to 0.96 on scroll, this color frames the poster.
 */
export const getSuitableUnderlayColor = (color: string): string => {
  const c = color.toUpperCase();
  switch (c) {
    case '#EBB945': // Mustard: rich warm dark amber
      return '#5C4410';
    case '#7C0F0F': // Deep Red: rich dark burgundy
      return '#380707';
    case '#E4501A': // Burnt Orange: rich dark rust
      return '#5C1D06';
    case '#1428D0': // Cobalt: rich dark navy
      return '#0A1468';
    case '#000000': // Black: pure black
      return '#000000';
    case '#FBF1DC': // Cream: dark warm tone
      return '#26221A';
    default:
      return color;
  }
};

export const PosterStack: React.FC<PosterStackProps> = ({ posters, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimmerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Synchronize document background color on initial mount with the first poster
  useEffect(() => {
    if (typeof document !== 'undefined' && posters.length > 0) {
      document.documentElement.style.backgroundColor = posters[0].color;
      document.body.style.backgroundColor = posters[0].color;
    }
  }, [posters]);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Dynamic background color updates as each poster becomes active
      posters.forEach((poster, idx) => {
        const currentEl = sectionRefs.current[idx];
        if (!currentEl) return;

        const isLastPoster = idx === posters.length - 1;
        ScrollTrigger.create({
          trigger: currentEl,
          start: 'top 50%',
          end: isLastPoster ? 'bottom 95%' : 'bottom 50%',
          onEnter: () => {
            document.documentElement.style.backgroundColor = poster.color;
            document.body.style.backgroundColor = poster.color;
          },
          onEnterBack: () => {
            document.documentElement.style.backgroundColor = poster.color;
            document.body.style.backgroundColor = poster.color;
          },
          ...(isLastPoster
            ? {
                onLeave: () => {
                  document.documentElement.style.backgroundColor = '#000000';
                  document.body.style.backgroundColor = '#000000';
                }
              }
            : {})
        });
      });

      // 2. Poster stacked scroll parallax, scaling, and dimming
      posters.forEach((_, idx) => {
        if (idx === 0) return; // First poster is already present at scroll 0

        const currentEl = sectionRefs.current[idx];
        const prevContent = contentRefs.current[idx - 1];
        const prevDimmer = dimmerRefs.current[idx - 1];
        const prevSection = sectionRefs.current[idx - 1];
        if (!currentEl || !prevContent) return;

        // Current poster slides up over previous poster across exactly 1 viewport of scroll.
        // Previous poster stays in place, its inner content scales down to 0.96 and dims slightly.
        const scrollTriggerConfig = {
          trigger: currentEl,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            if (prevSection) {
              prevSection.style.visibility = 'visible';
            }
          },
          onLeave: () => {
            // Once the new poster has completely covered the outgoing section,
            // hide the outgoing section so past layers never bleed through
            if (prevSection) {
              prevSection.style.visibility = 'hidden';
            }
          },
          onEnterBack: () => {
            if (prevSection) {
              prevSection.style.visibility = 'visible';
            }
          },
          onLeaveBack: () => {
            if (prevSection) {
              prevSection.style.visibility = 'visible';
            }
          }
        };

        // 1. Previous poster inner content scales down to 0.96
        gsap.fromTo(
          prevContent,
          { scale: 1 },
          {
            scale: 0.96,
            ease: 'none',
            scrollTrigger: scrollTriggerConfig
          }
        );

        // 2. Dimmer overlay fades in to 0.2
        if (prevDimmer) {
          gsap.fromTo(
            prevDimmer,
            { opacity: 0 },
            {
              opacity: 0.2,
              ease: 'none',
              scrollTrigger: scrollTriggerConfig
            }
          );
        }

        // 3. Element Hand-off on outgoing poster: layers move at different speeds
        // Giant type slowest
        const prevGiantType = prevContent.querySelector('[data-motion="giant-type"]');
        if (prevGiantType) {
          gsap.fromTo(
            prevGiantType,
            { yPercent: 0 },
            { yPercent: -10, ease: 'none', scrollTrigger: scrollTriggerConfig }
          );
        }

        // Supporting text fastest
        const prevText = prevContent.querySelector('[data-motion="supporting-text"]');
        if (prevText) {
          gsap.fromTo(
            prevText,
            { yPercent: 0, opacity: 1 },
            { yPercent: -22, opacity: 0.7, ease: 'none', scrollTrigger: scrollTriggerConfig }
          );
        }

        // Phone mockup moves at medium pace
        const prevPhone = prevContent.querySelector('[data-motion="phone"]');
        if (prevPhone) {
          gsap.fromTo(
            prevPhone,
            { yPercent: 0 },
            { yPercent: -15, ease: 'none', scrollTrigger: scrollTriggerConfig }
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      sectionRefs.current.forEach((el) => {
        if (el) el.style.visibility = '';
      });
    };
  }, [posters]);

  return (
    <div ref={containerRef} className={`relative w-full overflow-visible ${className}`}>
      {posters.map((poster, idx) => (
        <section
          key={poster.id}
          id={poster.id}
          ref={(el) => {
            sectionRefs.current[idx] = el;
          }}
          className="sticky top-0 w-full min-h-svh overflow-hidden will-change-[transform,clip-path,opacity] box-border max-[900px]:relative max-[900px]:top-auto motion-reduce:relative motion-reduce:top-auto motion-reduce:[clip-path:none] motion-reduce:!transform-none motion-reduce:!opacity-100"
          style={{
            zIndex: idx + 1,
            backgroundColor: getSuitableUnderlayColor(poster.color)
          }}
        >
          <div
            ref={(el) => {
              contentRefs.current[idx] = el;
            }}
            className="relative w-full min-h-svh overflow-hidden will-change-transform origin-center box-border motion-reduce:!transform-none"
            style={{
              backgroundColor: poster.color
            }}
          >
            {poster.component}
            <div
              ref={(el) => {
                dimmerRefs.current[idx] = el;
              }}
              className="absolute inset-0 bg-black opacity-0 pointer-events-none z-[990] will-change-[opacity] motion-reduce:hidden"
            />
          </div>
        </section>
      ))}
    </div>
  );
};
