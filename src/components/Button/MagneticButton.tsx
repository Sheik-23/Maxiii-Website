import React, { useRef, useEffect } from 'react';
import { TransitionLink } from '../../transitions/TransitionLink';
import gsap from 'gsap';
import { prefersReducedMotion, motionTokens } from '../../motion/tokens';

interface MagneticButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
  children?: React.ReactNode;
  dataCursor?: 'link' | 'pointer' | 'view';
}

const BASE_BTN =
  "inline-flex items-center justify-center gap-3 py-[18px] px-9 font-display text-[1.15rem] tracking-[0.06em] uppercase no-underline border-2 rounded-[4px] cursor-pointer relative overflow-hidden select-none transition-[transform,box-shadow,background-color] duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-cream focus-visible:outline-offset-4 before:content-[''] before:absolute before:top-0 before:-left-[120%] before:w-[60%] before:h-full before:skew-x-[-20deg] before:pointer-events-none before:transition-[left] before:duration-[650ms] before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:left-[140%] before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.35)_50%,transparent_100%)]";

const PRIMARY_BTN =
  'bg-saffron text-black border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FFA042] hover:shadow-[6px_6px_0px_#000000] active:shadow-[2px_2px_0px_#000000]';

const OUTLINE_BTN =
  'bg-transparent text-cream border-current shadow-[4px_4px_0px_currentColor] hover:bg-cream hover:text-black hover:shadow-[6px_6px_0px_currentColor] active:shadow-[2px_2px_0px_currentColor]';

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  children = 'Join the waitlist',
  dataCursor = 'link'
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (wrapRef.current) {
        gsap.killTweensOf(wrapRef.current);
      }
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion() || !wrapRef.current) return;

    const rect = wrapRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const pullX = (e.clientX - centerX) * 0.35;
    const pullY = (e.clientY - centerY) * 0.35;

    gsap.to(wrapRef.current, {
      x: pullX,
      y: pullY,
      duration: motionTokens.durations.fast,
      ease: motionTokens.easings.gsapDramaticEnter
    });
  };

  const handlePointerLeave = () => {
    if (!wrapRef.current) return;
    gsap.to(wrapRef.current, {
      x: 0,
      y: 0,
      duration: motionTokens.durations.base,
      ease: motionTokens.easings.gsapPunchyBounce
    });
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  const btnClasses = `${BASE_BTN} ${variant === 'outline' ? OUTLINE_BTN : PRIMARY_BTN} ${className}`;

  return (
    <div
      ref={wrapRef}
      className="inline-block relative will-change-transform"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {to ? (
        <TransitionLink
          to={to}
          className={btnClasses}
          onClick={handleClick}
          data-cursor={dataCursor}
        >
          {children}
        </TransitionLink>
      ) : href ? (
        <a
          href={href}
          className={btnClasses}
          onClick={handleClick}
          data-cursor={dataCursor}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          className={btnClasses}
          onClick={handleClick}
          data-cursor={dataCursor}
        >
          {children}
        </button>
      )}
    </div>
  );
};
