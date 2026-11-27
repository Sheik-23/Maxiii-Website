import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../motion/tokens';

gsap.registerPlugin(ScrollTrigger);

export const BarcodeScannerScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const laserRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  const titleLetters = [
    { char: 'S', key: 's' },
    { char: 'c', key: 'c' },
    { char: 'a', key: 'a' },
    { char: 'n', key: 'n' },
    { char: ' ', key: 'sp' },
    { char: 'i', key: 'i' },
    { char: 't', key: 't' },
    { char: '.', key: 'dot' }
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const timers: number[] = [];
    let sweepTl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const bars = containerRef.current?.querySelectorAll('.js-barcode-bar');
      const letters = containerRef.current?.querySelectorAll('.js-scan-letter');
      const laser = laserRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      if (bars && bars.length > 0) {
        tl.fromTo(
          bars,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 0.88, duration: 0.8, stagger: 0.04, ease: 'power3.out' },
          0
        );
      }

      if (laser && containerRef.current) {
        sweepTl = gsap.timeline({ repeat: -1, yoyo: true });
        sweepTl.fromTo(
          laser,
          { left: '5%', opacity: 0.9 },
          {
            left: '95%',
            opacity: 1,
            duration: 1.4,
            ease: 'power1.inOut',
            onUpdate: function () {
              const progress = this.progress();
              const activeBarIdx = Math.floor(progress * (bars?.length || 20));
              if (bars && bars[activeBarIdx]) {
                const el = bars[activeBarIdx] as SVGElement;
                el.style.fill = '#FBF1DC';
                const id = window.setTimeout(() => {
                  el.style.fill = '#000000';
                }, 160);
                timers.push(id);
              }
            }
          }
        );
      }

      if (letters && letters.length > 0) {
        tl.call(
          () => {
            letters.forEach((l, idx) => {
              const id = window.setTimeout(() => {
                l.setAttribute('data-filled', 'true');
              }, idx * 60);
              timers.push(id);
            });
          },
          undefined,
          0.6
        );
      }

      if (copyRef.current) {
        tl.fromTo(
          copyRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          1.2
        );
      }
    }, containerRef);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!sweepTl) return;
        if (entry.isIntersecting) {
          sweepTl.resume();
        } else {
          sweepTl.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      timers.forEach((id) => clearTimeout(id));
      ctx.revert();
    };
  }, []);

  const barClass = 'js-barcode-bar origin-top will-change-[transform,fill] transition-[fill] duration-300';

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-svh bg-burnt-orange text-cream overflow-hidden box-border flex flex-col justify-between py-[clamp(60px,8vw,100px)] px-[clamp(24px,5vw,64px)] max-[900px]:pt-[70px] max-[900px]:px-6 max-[600px]:px-5 max-[900px]:pb-[36px]"
      aria-label="Barcode Scanner Poster"
      data-cursor="view"
    >
      <div
        className="absolute -top-[60vh] left-[clamp(20px,15vw,240px)] max-[900px]:left-0 w-[min(82vw,840px)] max-[900px]:w-[140vw] h-[220vh] pointer-events-none z-[1] text-black opacity-[0.88] max-[900px]:opacity-65"
        aria-hidden="true"
        data-motion="giant-type"
      >
        <span
          ref={laserRef}
          className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_18px_4px_#FFFFFF,0_0_42px_10px_#FBF1DC,0_0_80px_18px_rgba(255,138,31,0.45)] z-[2] pointer-events-none will-change-transform"
        />
        <svg viewBox="0 0 320 800" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <rect className={barClass} x="0" y="0" width="8" height="800" fill="currentColor" />
          <rect className={barClass} x="14" y="0" width="4" height="800" fill="currentColor" />
          <rect className={barClass} x="24" y="0" width="12" height="800" fill="currentColor" />
          <rect className={barClass} x="42" y="0" width="6" height="800" fill="currentColor" />
          <rect className={barClass} x="54" y="0" width="16" height="800" fill="currentColor" />
          <rect className={barClass} x="76" y="0" width="8" height="800" fill="currentColor" />
          <rect className={barClass} x="90" y="0" width="4" height="800" fill="currentColor" />
          <rect className={barClass} x="100" y="0" width="14" height="800" fill="currentColor" />
          <rect className={barClass} x="120" y="0" width="8" height="800" fill="currentColor" />
          <rect className={barClass} x="134" y="0" width="18" height="800" fill="currentColor" />
          <rect className={barClass} x="158" y="0" width="4" height="800" fill="currentColor" />
          <rect className={barClass} x="168" y="0" width="12" height="800" fill="currentColor" />
          <rect className={barClass} x="186" y="0" width="8" height="800" fill="currentColor" />
          <rect className={barClass} x="200" y="0" width="4" height="800" fill="currentColor" />
          <rect className={barClass} x="210" y="0" width="16" height="800" fill="currentColor" />
          <rect className={barClass} x="232" y="0" width="8" height="800" fill="currentColor" />
          <rect className={barClass} x="246" y="0" width="14" height="800" fill="currentColor" />
          <rect className={barClass} x="266" y="0" width="4" height="800" fill="currentColor" />
          <rect className={barClass} x="276" y="0" width="18" height="800" fill="currentColor" />
          <rect className={barClass} x="300" y="0" width="8" height="800" fill="currentColor" />
          <rect className={barClass} x="314" y="0" width="6" height="800" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-[3] mt-[clamp(40px,10vw,80px)]" data-motion="giant-type">
        <h2
          className="font-display text-[clamp(6.5rem,24vw,22rem)] max-[900px]:text-[clamp(4.5rem,20vw,9rem)] leading-[0.85] tracking-[-0.03em] uppercase m-0 [text-shadow:0_10px_40px_rgba(0,0,0,0.4)]"
          aria-label="Scan it."
        >
          {titleLetters.map((item) =>
            item.char === ' ' ? (
              <span key={item.key} className="inline-block w-[0.25em]">
                &nbsp;
              </span>
            ) : (
              <span
                key={item.key}
                className="js-scan-letter inline-block text-transparent [-webkit-text-stroke:2px_#FBF1DC] max-md:[-webkit-text-stroke:1.5px_#FBF1DC] transition-[color,-webkit-text-stroke] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[color] data-[filled=true]:!text-cream data-[filled=true]:![-webkit-text-stroke:0px_transparent]"
              >
                {item.char}
              </span>
            )
          )}
        </h2>
      </div>

      <div
        className="relative z-[4] max-w-[460px] mb-[clamp(20px,4vw,40px)] ml-auto mr-[clamp(10px,4vw,40px)] max-[900px]:mr-0 max-[900px]:ml-0 max-[900px]:max-w-[420px]"
        data-motion="supporting-text"
      >
        <p ref={copyRef} className="font-serif text-[clamp(1.15rem,1.8vw,1.55rem)] max-[900px]:text-[1.1rem] leading-[1.55] text-cream m-0">
          Point your camera at a barcode and add the food to your day.
        </p>
      </div>
    </section>
  );
};
