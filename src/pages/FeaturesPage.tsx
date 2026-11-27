import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../motion/tokens';

gsap.registerPlugin(ScrollTrigger);
import { DeviceFrame3D } from '../components/Device/DeviceFrame3D';
import macroScreenshot from '../assets/screenshots/IMG_1352.PNG';
import macroScreenshotWebp from '../assets/screenshots/IMG_1352.webp';
import homeFoodScreenshot from '../assets/screenshots/IMG_1353.PNG';
import homeFoodScreenshotWebp from '../assets/screenshots/IMG_1353.webp';
import { HalftoneMoon } from '../components/HalftoneMoon/HalftoneMoon';
import { MagneticButton } from '../components/Button/MagneticButton';
import { PosterStack, type PosterItem } from '../components/PosterStack/PosterStack';
import { POSTER_COLORS } from '../config/tokens';

const CLOSING_FEATURES = [
  { text: 'EVERY MACRO', outline: false },
  { text: 'HOME COOKING', outline: true },
  { text: 'ADAPTIVE TARGET', outline: false },
  { text: 'BARCODE SCANNER', outline: true },
  { text: 'CUSTOMISATION', outline: false },
  { text: 'THE FLOOR', outline: true }
];

const FEATURE_INNER_BASE =
  'js-feature-section relative w-full h-svh min-h-svh overflow-hidden box-border py-[clamp(60px,8vh,100px)] px-[clamp(24px,5vw,64px)] flex flex-col justify-center max-[900px]:h-auto max-[900px]:pt-[calc(104px+env(safe-area-inset-top))] max-[900px]:px-6 max-[900px]:pb-[clamp(50px,8vw,80px)] max-[900px]:justify-start';
const CONTENT_GRID =
  'relative z-[2] grid grid-cols-[1.15fr_0.85fr] gap-[clamp(32px,6vw,80px)] items-center max-w-[1320px] mx-auto w-full max-[900px]:grid-cols-1 max-[900px]:gap-9 max-[900px]:items-start';
const COPY_COL = 'flex flex-col gap-4 max-w-[560px] max-[900px]:max-w-full';
const PHONE_COL =
  'flex justify-center items-center relative z-[2] w-full [@media(max-height:820px)_and_(min-width:901px)]:scale-[0.82] [@media(max-height:820px)_and_(min-width:901px)]:origin-center max-[900px]:mt-3';
const GIANT_TITLE =
  'js-feature-title font-display text-[clamp(3rem,6.5vw,5.25rem)] uppercase leading-[0.95] tracking-[0.02em] m-0 will-change-[transform,opacity,clip-path]';
const HEADLINE =
  'js-feature-line font-serif text-[clamp(1.25rem,1.8vw,1.65rem)] leading-[1.35] m-0 font-semibold opacity-[0.96] will-change-[transform,opacity]';
const BODY_COPY =
  'js-feature-line font-sans text-[clamp(1rem,1.15vw,1.15rem)] leading-[1.68] m-0 opacity-95 font-normal tracking-[-0.01em] max-w-[540px] will-change-[transform,opacity]';

export const FeaturesPage: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Features | MAXIII';
    if (prefersReducedMotion() || !mainRef.current) return;

    const ctx = gsap.context(() => {
      if (heroWrapRef.current) {
        const title = heroWrapRef.current.querySelector('.js-hero-title');
        const copyLines = heroWrapRef.current.querySelectorAll('.js-hero-copy > *');
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        if (title) {
          tl.fromTo(
            title,
            { clipPath: 'inset(-15% -10% 105% -10%)', y: 48, opacity: 0 },
            { clipPath: 'inset(-15% -10% -20% -10%)', y: 0, opacity: 1, duration: 0.95 },
            0.06
          );
        }
        if (copyLines.length > 0) {
          tl.fromTo(
            copyLines,
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
            0.24
          );
        }
      }

      const featureSections = mainRef.current?.querySelectorAll('.js-feature-section');
      featureSections?.forEach((sectionEl) => {
        const titleEl = sectionEl.querySelector('.js-feature-title');
        const lineEls = sectionEl.querySelectorAll('.js-feature-line');
        if (!titleEl && lineEls.length === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 76%',
            once: true
          }
        });

        if (titleEl) {
          tl.fromTo(
            titleEl,
            { clipPath: 'inset(-15% -10% 108% -10%)', y: 36, opacity: 0 },
            {
              clipPath: 'inset(-15% -10% -20% -10%)',
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power4.out'
            },
            0
          );
        }

        if (lineEls.length > 0) {
          tl.fromTo(
            lineEls,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' },
            0.14
          );
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const posters: PosterItem[] = [
    // Hero Poster: Giant "Features"
    {
      id: 'features-hero',
      component: (
        <div
          ref={heroWrapRef}
          className="relative w-full h-svh bg-cobalt text-cream flex flex-col justify-between pt-[clamp(100px,12vw,140px)] px-[clamp(24px,5vw,64px)] pb-[clamp(40px,6vw,80px)] box-border overflow-hidden"
        >
          <div className="relative w-full" data-motion="giant-type">
            <h1 className="js-hero-title font-display text-[clamp(4.5rem,16.5vw,16.5rem)] uppercase leading-[0.88] tracking-[0.04em] m-0 block whitespace-nowrap select-none">
              Features
            </h1>
          </div>
          <div className="js-hero-copy relative max-w-[680px] mt-8 flex flex-col gap-4" data-motion="supporting-text">
            <p className="font-serif text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.35] m-0 text-cream opacity-[0.98] font-semibold">
              Everything in MAXIII, in one place.
            </p>
            <p className="font-sans text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.68] m-0 text-cream opacity-[0.92] font-normal tracking-[-0.01em] max-w-[620px]">
              MAXIII is built specifically for lifters, gym training, and home cooking. Track full macronutrient breakdowns on every meal, account for raw to cooked yields and cooking oils directly, and follow adaptive calorie targets that adjust dynamically as your body changes.
            </p>
          </div>
        </div>
      ),
      color: POSTER_COLORS.cobalt
    },

    // 1. Every macro
    {
      id: 'feature-macros',
      component: (
        <div className={`${FEATURE_INNER_BASE} bg-mustard text-black`}>
          <div
            className="absolute inset-0 flex flex-col justify-around pointer-events-none opacity-[0.07] select-none z-[1]"
            aria-hidden="true"
            data-motion="giant-type"
          >
            <div className="whitespace-nowrap">
              <span className="font-display text-[clamp(4rem,12vw,11rem)] text-black">PROTEIN • CARBS • FIBRE • FAT</span>
            </div>
            <div className="whitespace-nowrap">
              <span className="font-display text-[clamp(4rem,12vw,11rem)] text-transparent [-webkit-text-stroke:2px_#000000]">
                PROTEIN • CARBS • FIBRE • FAT
              </span>
            </div>
            <div className="whitespace-nowrap">
              <span className="font-display text-[clamp(4rem,12vw,11rem)] text-black">PROTEIN • CARBS • FIBRE • FAT</span>
            </div>
          </div>

          <div className={CONTENT_GRID}>
            <div className={COPY_COL} data-motion="supporting-text">
              <h2 className={GIANT_TITLE}>Every macro.</h2>
              <h3 className={HEADLINE}>Complete nutritional visibility.</h3>
              <p className={BODY_COPY}>
                Protein, carbohydrates, fibre and fat on every meal, from the first log. Dietary fibre is tracked alongside carbohydrates on every dish so you understand your genuine net energy intake.
              </p>
              <p className={BODY_COPY}>
                Whether managing a deficit or supporting intense training, knowing your complete macronutrient distribution removes guesswork from your daily routine.
              </p>
            </div>
            <div className={PHONE_COL} data-motion="phone">
              <DeviceFrame3D
                screenSrc={macroScreenshot}
                screenSrcWebp={macroScreenshotWebp}
                label="Macros"
                sublabel="Complete nutritional view"
                tiltIntensity={-16}
              />
            </div>
          </div>
        </div>
      ),
      color: POSTER_COLORS.mustard
    },

    // 2. Home cooking
    {
      id: 'feature-home-cooking',
      component: (
        <div className={`${FEATURE_INNER_BASE} bg-deep-red text-cream`}>
          <div
            className="absolute right-[2vw] top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.07] select-none z-[1] whitespace-nowrap"
            aria-hidden="true"
            data-motion="giant-type"
          >
            <span className="font-serif italic text-[clamp(6rem,16vw,16rem)] text-cream leading-[0.9]">Home cooking.</span>
          </div>

          <div className={CONTENT_GRID}>
            <div className={COPY_COL} data-motion="supporting-text">
              <h2 className={GIANT_TITLE}>Home cooking.</h2>
              <h3 className={HEADLINE}>Accurate for the way you cook.</h3>
              <p className={BODY_COPY}>
                Log ingredients raw or cooked, with cooking changes and oil and ghee accounted for. Boiling, simmering, and roasting change food volume through water loss and absorption.
              </p>
              <p className={BODY_COPY}>
                MAXIII accounts for moisture yield and cooking fats in the pan, so your logged numbers reflect the actual plate in front of you.
              </p>
            </div>
            <div className={PHONE_COL} data-motion="phone">
              <DeviceFrame3D
                screenSrc={homeFoodScreenshot}
                screenSrcWebp={homeFoodScreenshotWebp}
                label="Cooking Yield"
                sublabel="Raw to cooked calculations"
                tiltIntensity={20}
              />
            </div>
          </div>
        </div>
      ),
      color: POSTER_COLORS.deepRed
    },

    // 3. A target that adapts
    {
      id: 'feature-target',
      component: (
        <div className={`${FEATURE_INNER_BASE} bg-black text-cream`}>
          <div
            className="absolute right-[clamp(20px,8vw,120px)] top-1/2 -translate-y-1/2 pointer-events-none opacity-35 z-[1] max-[900px]:right-1/2 max-[900px]:translate-x-1/2 max-[900px]:opacity-20"
            aria-hidden="true"
            data-motion="moon"
          >
            <HalftoneMoon size={520} />
          </div>

          <div className={CONTENT_GRID}>
            <div className={COPY_COL} data-motion="supporting-text">
              <h2 className={GIANT_TITLE}>Adaptive target.</h2>
              <h3 className={HEADLINE}>Your target moves when you do.</h3>
              <p className={BODY_COPY}>
                The daily calorie target adjusts as the weight trend changes. As training volume increases or body weight shifts, true daily energy expenditure changes over time.
              </p>
              <p className={BODY_COPY}>
                MAXIII evaluates weight trends alongside logged nutrition to adjust your target calories automatically, keeping progress consistent without manual calculations.
              </p>
            </div>
            <div className={PHONE_COL} data-motion="phone">
              <DeviceFrame3D
                screenSrc={macroScreenshot}
                screenSrcWebp={macroScreenshotWebp}
                label="Adaptive Target"
                sublabel="Expenditure adjustment"
                tiltIntensity={-12}
              />
            </div>
          </div>
        </div>
      ),
      color: POSTER_COLORS.black
    },

    // 4. Barcode scanner
    {
      id: 'feature-scanner',
      component: (
        <div className={`${FEATURE_INNER_BASE} bg-burnt-orange text-cream`}>
          <div
            className="absolute right-[clamp(20px,8vw,120px)] top-1/2 -translate-y-1/2 w-[clamp(260px,32vw,420px)] h-[120vh] pointer-events-none opacity-[0.12] z-[1] text-black"
            aria-hidden="true"
            data-motion="giant-type"
          >
            <span className="absolute left-0 right-0 h-1 bg-white shadow-[0_0_15px_3px_#ffffff,0_0_35px_8px_#FF8A1F] z-[2] animate-[sweepAnim_3.2s_ease-in-out_infinite_alternate]" />
            <svg viewBox="0 0 320 800" preserveAspectRatio="none" className="w-full h-full">
              <rect x="0" y="0" width="8" height="800" fill="currentColor" />
              <rect x="14" y="0" width="4" height="800" fill="currentColor" />
              <rect x="24" y="0" width="14" height="800" fill="currentColor" />
              <rect x="44" y="0" width="6" height="800" fill="currentColor" />
              <rect x="56" y="0" width="16" height="800" fill="currentColor" />
              <rect x="78" y="0" width="8" height="800" fill="currentColor" />
              <rect x="92" y="0" width="6" height="800" fill="currentColor" />
              <rect x="104" y="0" width="12" height="800" fill="currentColor" />
              <rect x="124" y="0" width="18" height="800" fill="currentColor" />
              <rect x="148" y="0" width="6" height="800" fill="currentColor" />
              <rect x="160" y="0" width="10" height="800" fill="currentColor" />
              <rect x="176" y="0" width="16" height="800" fill="currentColor" />
              <rect x="198" y="0" width="4" height="800" fill="currentColor" />
              <rect x="208" y="0" width="14" height="800" fill="currentColor" />
              <rect x="228" y="0" width="8" height="800" fill="currentColor" />
              <rect x="242" y="0" width="16" height="800" fill="currentColor" />
              <rect x="264" y="0" width="6" height="800" fill="currentColor" />
              <rect x="276" y="0" width="18" height="800" fill="currentColor" />
              <rect x="300" y="0" width="10" height="800" fill="currentColor" />
            </svg>
          </div>

          <div className={CONTENT_GRID}>
            <div className={COPY_COL} data-motion="supporting-text">
              <h2 className={GIANT_TITLE}>Barcode scanner.</h2>
              <h3 className={HEADLINE}>Fast packaged logging.</h3>
              <p className={BODY_COPY}>
                Scan packaged foods to log them faster. Point your camera at standard packaging barcodes to retrieve nutrition labels and portion sizes directly.
              </p>
              <p className={BODY_COPY}>
                Packaged pantry items, dairy, and supplements populate into your meal log without manual typing, saving time throughout your day.
              </p>
            </div>
            <div className={PHONE_COL} data-motion="phone">
              <DeviceFrame3D
                screenSrc={homeFoodScreenshot}
                screenSrcWebp={homeFoodScreenshotWebp}
                label="Barcode Scanner"
                sublabel="Packaged item capture"
                tiltIntensity={14}
              />
            </div>
          </div>
        </div>
      ),
      color: POSTER_COLORS.burntOrange
    },

    // 5. Customisation
    {
      id: 'feature-customisation',
      component: (
        <div className={`${FEATURE_INNER_BASE} bg-cobalt text-cream`}>
          <div
            className="absolute right-[4vw] top-1/2 -translate-y-1/2 flex flex-col justify-center items-end pointer-events-none opacity-[0.08] select-none z-[1]"
            aria-hidden="true"
            data-motion="giant-type"
          >
            <span className="font-display text-[clamp(6rem,20vw,18rem)] leading-[0.82] text-black">YOUR</span>
            <span className="font-display text-[clamp(6rem,20vw,18rem)] leading-[0.82] text-black">RHYTHM</span>
          </div>

          <div className={CONTENT_GRID}>
            <div className={COPY_COL} data-motion="supporting-text">
              <h2 className={GIANT_TITLE}>Customisation.</h2>
              <h3 className={HEADLINE}>Built around your routine.</h3>
              <p className={BODY_COPY}>
                Set up the app around how you eat and train. Align meal windows with your daily schedule, whether you follow intermittent eating or split meals around your workout sessions.
              </p>
              <p className={BODY_COPY}>
                Personalise target ratios, name your meal slots, and focus on the nutrition metrics that matter to your personal goals.
              </p>
            </div>
            <div className={PHONE_COL} data-motion="phone">
              <DeviceFrame3D
                screenSrc={macroScreenshot}
                screenSrcWebp={macroScreenshotWebp}
                label="Customisation"
                sublabel="Configured to your routine"
                tiltIntensity={-18}
              />
            </div>
          </div>
        </div>
      ),
      color: POSTER_COLORS.cobalt
    },

    // 6. Built for the floor
    {
      id: 'feature-floor',
      component: (
        <div className={`${FEATURE_INNER_BASE} bg-black text-cream`}>
          <div
            className="absolute right-[6vw] top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-[0.08] select-none whitespace-nowrap z-[1]"
            aria-hidden="true"
            data-motion="giant-type"
          >
            <div className="font-display text-[clamp(5rem,16vw,14rem)] text-cream leading-[0.9]">THE FLOOR</div>
            <div className="font-display text-[clamp(5rem,16vw,14rem)] text-transparent [-webkit-text-stroke:2px_#FBF1DC] leading-[0.9]">THE FLOOR</div>
            <div className="font-display text-[clamp(5rem,16vw,14rem)] text-cream leading-[0.9]">THE FLOOR</div>
          </div>

          <div className={CONTENT_GRID}>
            <div className={COPY_COL} data-motion="supporting-text">
              <h2 className={GIANT_TITLE}>Built for the floor.</h2>
              <h3 className={HEADLINE}>Engineered for lifters.</h3>
              <p className={BODY_COPY}>
                A clean, dark interface for logging between sets. High-contrast typography and clear touch targets ensure effortless entry in low-light weight rooms.
              </p>
              <p className={BODY_COPY}>
                Check remaining targets and record meals without visual distractions or intrusive screens, keeping your focus on recovery and training.
              </p>
            </div>
            <div className={PHONE_COL} data-motion="phone">
              <DeviceFrame3D
                screenSrc={homeFoodScreenshot}
                screenSrcWebp={homeFoodScreenshotWebp}
                label="Training Floor"
                sublabel="Dark gym interface"
                tiltIntensity={16}
              />
            </div>
          </div>
        </div>
      ),
      color: POSTER_COLORS.black
    },

    // 7. Closing poster
    {
      id: 'feature-closing',
      component: (
        <div
          className={`${FEATURE_INNER_BASE} bg-mustard text-black text-center items-center max-[900px]:!h-svh max-[900px]:!p-0 max-[900px]:!justify-center`}
        >
          <div
            className="absolute inset-0 flex justify-center items-center overflow-hidden pointer-events-none select-none"
            data-motion="giant-type"
          >
            <div className="flex flex-col items-center will-change-transform animate-[loopTopToBottom_22s_linear_infinite] motion-reduce:animate-none motion-reduce:transform-none">
              {[0, 1].map((halfIdx) => (
                <div key={halfIdx} className="flex flex-col items-center gap-[clamp(14px,2.5vh,28px)] max-md:gap-4 py-[clamp(7px,1.25vh,14px)] max-md:py-2 px-0">
                  {[0, 1].map((seqIdx) => (
                    <React.Fragment key={seqIdx}>
                      {CLOSING_FEATURES.map((item) => (
                        <div
                          key={`${halfIdx}-${seqIdx}-${item.text}`}
                          className={
                            item.outline
                              ? 'font-display text-[clamp(2.8rem,7.5vw,6.5rem)] max-md:text-[clamp(2rem,8vw,3.4rem)] leading-[0.92] text-transparent [-webkit-text-stroke:2.5px_#000000] max-md:[-webkit-text-stroke-width:1.5px] uppercase tracking-[-0.02em] whitespace-nowrap'
                              : 'font-display text-[clamp(2.8rem,7.5vw,6.5rem)] max-md:text-[clamp(2rem,8vw,3.4rem)] leading-[0.92] text-black uppercase tracking-[-0.02em] whitespace-nowrap'
                          }
                        >
                          {item.text}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute bottom-[clamp(32px,6vh,60px)] max-md:bottom-6 left-1/2 -translate-x-1/2 z-10"
            data-motion="supporting-text"
          >
            <MagneticButton to="/join">
              Join the waitlist
            </MagneticButton>
          </div>
        </div>
      ),
      color: POSTER_COLORS.mustard
    }
  ];

  return (
    <main ref={mainRef} className="w-full overflow-x-clip bg-black text-cream">
      <PosterStack posters={posters} />
    </main>
  );
};
