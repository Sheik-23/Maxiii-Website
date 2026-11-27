import React, { useRef, useState, useEffect } from 'react';
import { prefersReducedMotion } from '../../motion/tokens';
import maxiiiCreamPng from '../../assets/maxiii-cream.png';
import maxiiiCreamWebp from '../../assets/maxiii-cream.webp';
import defaultScreenshot from '../../assets/screenshots/IMG_1352.PNG';
import defaultScreenshotWebp from '../../assets/screenshots/IMG_1352.webp';

interface DeviceFrame3DProps {
  screenSrc?: string;
  screenSrcWebp?: string;
  alt?: string;
  label?: string;
  sublabel?: string;
  tiltIntensity?: number;
  className?: string;
}

export const DeviceFrame3D: React.FC<DeviceFrame3DProps> = ({
  screenSrc = defaultScreenshot,
  screenSrcWebp = defaultScreenshotWebp,
  alt = 'MAXIII app screen preview',
  label = 'Every Macro',
  sublabel = 'Carbohydrates and fibre included by default',
  tiltIntensity = 15,
  className = ''
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const tiltRef = useRef({ rx: 0, ry: 0, tx: 0, ty: 0, gx: 50, gy: 50, tgx: 50, tgy: 50, active: false });
  const rafRef = useRef<number | null>(null);
  const startLoopRef = useRef<() => void>(() => {});

  useEffect(() => {
    setHasError(false);
  }, [screenSrc]);

  useEffect(() => {
    const animate = () => {
      const s = tiltRef.current;
      s.rx += (s.tx - s.rx) * 0.16;
      s.ry += (s.ty - s.ry) * 0.16;
      s.gx += (s.tgx - s.gx) * 0.16;
      s.gy += (s.tgy - s.gy) * 0.16;

      if (frameRef.current) {
        const shadowX = (-s.ry * 1.4).toFixed(2);
        const shadowY = (30 + s.rx * 1.4).toFixed(2);
        frameRef.current.style.transform = `rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;
        frameRef.current.style.setProperty('--glare-x', `${s.gx.toFixed(1)}%`);
        frameRef.current.style.setProperty('--glare-y', `${s.gy.toFixed(1)}%`);
        frameRef.current.style.setProperty('--shadow-x', `${shadowX}px`);
        frameRef.current.style.setProperty('--shadow-y', `${shadowY}px`);
      }

      const settled =
        !s.active &&
        Math.abs(s.rx) < 0.02 &&
        Math.abs(s.ry) < 0.02 &&
        Math.abs(s.gx - 50) < 0.1 &&
        Math.abs(s.gy - 50) < 0.1;

      if (!settled) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    startLoopRef.current = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || prefersReducedMotion() || !frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    tiltRef.current.tgx = (x / rect.width) * 100;
    tiltRef.current.tgy = (y / rect.height) * 100;
    tiltRef.current.ty = ((x / rect.width) - 0.5) * tiltIntensity;
    tiltRef.current.tx = -((y / rect.height) - 0.5) * tiltIntensity;
    tiltRef.current.active = true;

    startLoopRef.current();
  };

  const handlePointerLeave = () => {
    tiltRef.current.tx = 0;
    tiltRef.current.ty = 0;
    tiltRef.current.tgx = 50;
    tiltRef.current.tgy = 50;
    tiltRef.current.active = false;

    startLoopRef.current();
  };

  return (
    <div
      className={`[perspective:1200px] flex justify-center items-center w-full max-w-[380px] mx-auto select-none ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={frameRef}
        className="relative w-[300px] h-[630px] p-2 box-border rounded-[48px] [transform-style:preserve-3d] will-change-transform bg-[linear-gradient(145deg,#1b1b22_0%,#0e0e13_100%)] shadow-[var(--shadow-x,0px)_var(--shadow-y,30px)_80px_-16px_rgba(0,0,0,0.78),0_0_0_2px_#32323d,0_0_0_3.5px_#0b0b0e,inset_0_0_0_1.5px_rgba(255,255,255,0.14)] max-md:w-[264px] max-md:h-[554px] max-md:p-[7px] max-md:rounded-[42px]"
      >
        {/* Inner Glass Screen Viewport */}
        <div className="relative w-full h-full rounded-[40px] max-md:rounded-[35px] overflow-hidden bg-[#0d0d0d] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] flex flex-col">
          {/* Dynamic Island */}
          <div
            className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[74px] h-[18px] bg-black rounded-[12px] z-30 shadow-[inset_0_0_0_0.75px_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.5)] max-md:top-[6px] max-md:w-[64px] max-md:h-4"
            aria-hidden="true"
          />

          {/* Specular Glare Reflection */}
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.04) 36%, transparent 68%), linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, transparent 40%, rgba(255, 138, 31, 0.03) 100%)'
            }}
            aria-hidden="true"
          />

          {screenSrc && !hasError ? (
            <picture className="w-full h-full block">
              {screenSrcWebp && <source srcSet={screenSrcWebp} type="image/webp" />}
              <img
                src={screenSrc}
                alt={alt}
                className="w-full h-full object-cover object-bottom block"
                width={600}
                height={1298}
                onError={() => setHasError(true)}
                loading="lazy"
                decoding="async"
              />
            </picture>
          ) : (
            <div
              className="flex-1 flex flex-col justify-between pt-[60px] px-6 pb-9 text-cream relative bg-[radial-gradient(ellipse_at_top,rgba(255,138,31,0.08)_0%,transparent_60%),linear-gradient(180deg,#101015_0%,#08080a_100%)]"
              role="region"
              aria-label={label}
            >
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none"
                aria-hidden="true"
              />

              <div className="flex justify-between items-center relative z-[2]">
                <picture>
                  <source srcSet={maxiiiCreamWebp} type="image/webp" />
                  <img
                    src={maxiiiCreamPng}
                    alt="MAXIII"
                    width={82}
                    height={24}
                    style={{ height: 24, width: 'auto', objectFit: 'contain' }}
                    decoding="async"
                  />
                </picture>
                <span className="font-sans text-[11px] font-bold tracking-[0.12em] uppercase text-saffron py-1 px-2.5 rounded-[12px] bg-[rgba(255,138,31,0.12)] border border-[rgba(255,138,31,0.25)]">
                  PREVIEW
                </span>
              </div>

              <div className="relative z-[2] text-center my-auto">
                <h4 className="font-display text-[1.8rem] uppercase tracking-[0.04em] text-cream mb-2">{label}</h4>
                <p className="font-serif italic text-[1.1rem] text-[rgba(251,241,220,0.65)]">{sublabel}</p>
              </div>

              <div className="relative z-[2] flex justify-between items-center font-mono text-[10px] text-[rgba(251,241,220,0.4)] tracking-[0.08em] border-t border-white/6 pt-3.5">
                <span>IOS &amp; ANDROID</span>
                <span>MAXIII.APP</span>
              </div>
            </div>
          )}

          {/* Bottom Home Indicator */}
          <div
            className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-24 h-[3.5px] bg-white/28 rounded-[2px] z-30"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
