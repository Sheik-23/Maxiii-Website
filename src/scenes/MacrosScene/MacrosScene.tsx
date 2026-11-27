import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../motion/tokens';
import { DeviceFrame3D } from '../../components/Device/DeviceFrame3D';
import macroScreenshot from '../../assets/screenshots/IMG_1352.PNG';
import macroScreenshotWebp from '../../assets/screenshots/IMG_1352.webp';

const MACRO_ROWS = [
  { word: 'CARBS', animClass: 'animate-[scrollMarqueeLeft_36s_linear_infinite]', startOutlined: false },
  { word: 'FIBRE', animClass: 'animate-[scrollMarqueeRight_40s_linear_infinite]', startOutlined: true },
  { word: 'PROTEIN', animClass: 'animate-[scrollMarqueeLeft_32s_linear_infinite]', startOutlined: false },
  { word: 'FAT', animClass: 'animate-[scrollMarqueeRight_44s_linear_infinite]', startOutlined: true }
] as const;

const HALF_REPEAT_COUNT = 8;

export const MacrosScene: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const playState = isInView ? 'running' : 'paused';

  return (
    <section
      ref={containerRef}
      className="relative w-full h-svh min-h-svh max-[860px]:h-auto bg-mustard text-black flex flex-col justify-between pt-[calc(74px+env(safe-area-inset-top))] px-0 pb-[calc(20px+env(safe-area-inset-bottom))] max-[860px]:pt-[calc(74px+env(safe-area-inset-top))] max-[860px]:pb-[calc(32px+env(safe-area-inset-bottom))] max-[860px]:gap-5 overflow-hidden box-border"
      aria-label="Macro Tracking Poster"
    >
      <header className="shrink-0 px-10 pb-[10px] max-[860px]:px-5 flex justify-between items-baseline border-b-2 border-black mb-0 relative z-10">
        <span className="font-sans text-[14px] font-bold tracking-[0.08em] uppercase inline-flex items-center gap-[10px] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-black before:inline-block">
          ALL MACROS INCLUDED
        </span>
      </header>

      <div className="relative flex-1 min-h-0 flex items-center justify-center w-full overflow-hidden max-[860px]:flex-none max-[860px]:py-2">
        {/* Layer 1: Seamless continuous kinetic typography marquee */}
        <div className="flex flex-col justify-center gap-0 w-full overflow-hidden select-none relative z-[1] max-[860px]:absolute max-[860px]:inset-0">
          {MACRO_ROWS.map((row) => (
            <div
              key={row.word}
              className={`flex flex-nowrap whitespace-nowrap leading-[0.86] will-change-transform w-max motion-reduce:!animate-none ${row.animClass}`}
              style={{ animationPlayState: playState }}
            >
              {[0, 1].map((half) => (
                <div
                  key={half}
                  className="flex flex-nowrap shrink-0"
                  aria-hidden={half === 1 ? 'true' : undefined}
                >
                  {Array.from({ length: HALF_REPEAT_COUNT }, (_, idx) => {
                    const isOutlined = row.startOutlined ? idx % 2 === 0 : idx % 2 === 1;
                    return (
                      <span
                        key={idx}
                        className={`font-display text-[clamp(5rem,min(14vw,17.8vh),14rem)] max-[860px]:text-[clamp(4.8rem,20vw,8rem)] uppercase tracking-[-0.04em] px-4 inline-block shrink-0 ${
                          isOutlined
                            ? '[-webkit-text-stroke:2px_#000000] text-transparent'
                            : 'text-black'
                        }`}
                      >
                        {row.word}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Layer 2: 3D interactive device cutout hovering in front */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.92] [@media(max-height:920px)_and_(min-width:861px)]:scale-[0.84] [@media(max-height:780px)_and_(min-width:861px)]:scale-[0.72] max-[860px]:relative max-[860px]:top-auto max-[860px]:left-auto max-[860px]:translate-x-0 max-[860px]:translate-y-0 max-[860px]:scale-[0.84] max-[860px]:-my-9 z-[5] pointer-events-auto"
          data-cursor="view"
        >
          <DeviceFrame3D
            screenSrc={macroScreenshot}
            screenSrcWebp={macroScreenshotWebp}
            label="Every Macro"
            sublabel="Carbohydrates and fibre included by default"
          />
        </div>
      </div>

      <footer className="shrink-0 pt-4 px-10 max-[860px]:pt-[18px] max-[860px]:px-5 grid grid-cols-2 max-[860px]:grid-cols-1 gap-9 max-[860px]:gap-[14px] border-t-2 border-black items-end relative z-10">
        <h2 className="font-serif italic text-[clamp(1.85rem,3.6vw,3.1rem)] max-[860px]:text-[clamp(1.75rem,7vw,2.3rem)] leading-[1.06] tracking-[-0.01em] m-0">
          "Every macro, from the first log."
        </h2>
        <p className="font-serif text-[clamp(1.05rem,1.45vw,1.25rem)] max-[860px]:text-[1.05rem] leading-[1.48] m-0">
          Protein, carbohydrates, fibre and fat are tracked on every meal, with nothing hidden in a separate report.
        </p>
      </footer>
    </section>
  );
};
