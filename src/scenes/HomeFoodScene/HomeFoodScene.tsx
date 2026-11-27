import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../motion/tokens';
import { DeviceFrame3D } from '../../components/Device/DeviceFrame3D';
import homeFoodScreenshot from '../../assets/screenshots/IMG_1353.PNG';
import homeFoodScreenshotWebp from '../../assets/screenshots/IMG_1353.webp';

gsap.registerPlugin(ScrollTrigger);

export const HomeFoodScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const bgWatermarkRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
          once: true
        }
      });

      const titleWords = headlineRef.current?.querySelectorAll('.js-title-word');
      if (titleWords && titleWords.length > 0) {
        tl.fromTo(
          titleWords,
          {
            clipPath: 'inset(-25% -25% 108% -25%)',
            y: 42,
            opacity: 0
          },
          {
            clipPath: 'inset(-25% -25% -25% -25%)',
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.11,
            ease: 'power4.out'
          },
          0
        );
      }

      if (ruleRef.current) {
        tl.fromTo(
          ruleRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.75, ease: 'power3.out' },
          0.14
        );
      }

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          {
            clipPath: 'inset(-15% -5% 105% -5%)',
            y: 26,
            opacity: 0
          },
          {
            clipPath: 'inset(-15% -5% -20% -5%)',
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out'
          },
          0.22
        );
      }

      if (bodyRef.current) {
        tl.fromTo(
          bodyRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 0.9, duration: 0.85, ease: 'power3.out' },
          0.34
        );
      }

      if (phoneRef.current) {
        tl.fromTo(
          phoneRef.current,
          { y: 44, scale: 0.96, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.14
        );
      }

      if (bgWatermarkRef.current) {
        gsap.fromTo(
          bgWatermarkRef.current,
          { xPercent: 4 },
          {
            xPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    }, containerRef);

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  const playState = isInView ? 'running' : 'paused';

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-svh bg-deep-red text-cream overflow-hidden box-border flex items-center max-[900px]:items-start py-[clamp(72px,8vw,104px)] px-[clamp(24px,5vw,64px)] max-[900px]:pt-[88px] max-[900px]:pb-12 max-[900px]:px-6 max-[600px]:px-5"
      aria-label="Home Food Poster"
    >
      {/* Creative Editorial Background: Outlined Watermark + Pure Cream Steam Strips */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[0]"
        aria-hidden="true"
      >
        {/* Architectural Outlined Display Watermark drifting subtly on scroll */}
        <div
          ref={bgWatermarkRef}
          className="absolute -bottom-[6%] -left-[4vw] whitespace-nowrap will-change-transform opacity-[0.085]"
        >
          <span className="font-display text-[clamp(8rem,22vw,22rem)] uppercase leading-[0.82] tracking-[-0.03em] text-transparent [-webkit-text-stroke:2px_#FBF1DC] max-md:[-webkit-text-stroke:1.5px_#FBF1DC]">
            RAW TO COOKED
          </span>
        </div>

        {/* Pure Cream rising steam curves behind editorial column & phone */}
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="absolute inset-0 w-full h-full transform-gpu"
        >
          <path
            d="M 760 820 C 720 640, 840 520, 770 340 C 710 190, 810 80, 775 -40"
            stroke="#FBF1DC"
            strokeOpacity="0.16"
            strokeWidth="1.5"
            className="opacity-70 will-change-[transform,opacity] animate-[steamRise_9s_ease-in-out_infinite] motion-reduce:animate-none"
            style={{ animationPlayState: playState }}
          />
          <path
            d="M 880 840 C 930 660, 800 500, 895 310 C 960 180, 845 70, 890 -40"
            stroke="#FBF1DC"
            strokeOpacity="0.16"
            strokeWidth="1.5"
            className="opacity-70 will-change-[transform,opacity] animate-[steamRise_11s_ease-in-out_1.5s_infinite] motion-reduce:animate-none"
            style={{ animationPlayState: playState }}
          />
          <path
            d="M 995 830 C 950 650, 1060 510, 985 330 C 930 195, 1030 90, 995 -40"
            stroke="#FBF1DC"
            strokeOpacity="0.14"
            strokeWidth="1.25"
            className="opacity-70 will-change-[transform,opacity] animate-[steamRise_13s_ease-in-out_3s_infinite] motion-reduce:animate-none"
            style={{ animationPlayState: playState }}
          />
        </svg>
      </div>

      <div className="relative z-[2] isolate w-full max-w-[1320px] mx-auto grid grid-cols-[1.15fr_0.85fr] max-[900px]:grid-cols-1 gap-10 max-[900px]:gap-8 items-center">
        {/* Left Editorial Stack: Giant Italic Headline + Hairline + Supporting Copy */}
        <div className="flex flex-col justify-center gap-7 max-[900px]:gap-5">
          {/* Outer wrapper belongs to PosterStack hand-off; inner word spans use clip-path curtain so italic 'f' never clips */}
          <div className="relative w-full pointer-events-none z-[1] select-none" data-motion="giant-type">
            <h2
              ref={headlineRef}
              aria-label="Home food."
              className="font-serif italic text-[clamp(4.4rem,10.5vw,10.5rem)] max-[900px]:text-[clamp(3rem,12.5vw,6.2rem)] leading-[1.08] tracking-[-0.03em] text-cream whitespace-nowrap m-0 block pl-[0.06em] pr-[0.14em]"
            >
              <span className="js-title-word inline-block will-change-[transform,opacity,clip-path]">Home</span>{' '}
              <span className="js-title-word inline-block will-change-[transform,opacity,clip-path]">food.</span>
            </h2>
          </div>

          {/* Outer wrapper belongs to PosterStack hand-off; inner elements stagger in independently */}
          <div className="relative z-[3] max-w-[520px]" data-motion="supporting-text">
            <div className="flex flex-col gap-3.5">
              <span
                ref={ruleRef}
                className="block w-14 h-[1.5px] bg-cream/65 origin-left mb-1 will-change-[transform,opacity]"
                aria-hidden="true"
              />
              <p
                ref={taglineRef}
                className="font-serif italic text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1.2] tracking-[-0.01em] text-cream m-0 will-change-[transform,opacity,clip-path]"
              >
                From raw ingredients to the cooked plate.
              </p>
              <p
                ref={bodyRef}
                className="font-serif text-[clamp(1.08rem,1.45vw,1.3rem)] max-[900px]:text-[1.06rem] leading-[1.55] text-cream/90 m-0 max-w-[460px] will-change-[transform,opacity]"
              >
                Log ingredients raw or cooked. MAXIII accounts for cooking changes, including oil and ghee, so your numbers reflect the plate in front of you.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Outer wrapper belongs to PosterStack; inner phoneRef handles entrance; innermost handles 3D tilt */}
        <div className="flex justify-center items-center z-[2]" data-cursor="view" data-motion="phone">
          <div ref={phoneRef} className="will-change-[transform,opacity]">
            <div className="[transform:rotate(-7deg)_rotateY(-7deg)_scale(0.94)] [@media(max-height:840px)_and_(min-width:901px)]:scale-[0.84] max-[900px]:[transform:rotate(-4deg)_scale(0.88)] max-[900px]:-my-2">
              <DeviceFrame3D
                screenSrc={homeFoodScreenshot}
                screenSrcWebp={homeFoodScreenshotWebp}
                label="Cooking Yield"
                sublabel="Raw to cooked with oil and ghee"
                tiltIntensity={22}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
