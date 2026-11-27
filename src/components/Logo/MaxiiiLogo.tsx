import React, { forwardRef } from 'react';

interface MaxiiiLogoProps {
  color?: string;
  dotColor?: string;
  height?: number | string;
  className?: string;
  animated?: boolean;
  maskId?: string;
}

export const MaxiiiLogo = forwardRef<HTMLSpanElement, MaxiiiLogoProps>(({
  color = 'currentColor',
  dotColor = 'var(--color-saffron, #FF8A1F)',
  height,
  className = '',
  maskId = 'logoBaselineMask'
}, ref) => {
  const customHeight = height !== undefined
    ? (typeof height === 'number' ? `${height}px` : height)
    : undefined;

  return (
    <span
      ref={ref}
      className={`inline-flex items-center leading-none align-middle h-[var(--logo-height,32px)] max-[860px]:h-[var(--logo-height,28px)] w-auto shrink-0 ${className}`}
      style={customHeight ? ({ '--logo-height': customHeight, height: customHeight } as React.CSSProperties) : undefined}
      role="img"
      aria-label="MAXIII"
    >
      <svg
        viewBox="0 0 940 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-full w-auto aspect-[940/300] overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={maskId}>
            <rect x="0" y="0" width="940" height="295" />
          </clipPath>
        </defs>

        <g clipPath={`url(#${maskId})`}>
          <path
            data-letter="m"
            className="origin-bottom will-change-transform"
            d="M20 283V114C20 112 21 110 24 110H68C70 110 71 112 71 114V135C83 118 103 108 129 108C154 108 171 120 180 137C194 118 214 108 240 108C278 108 284 133 284 173V283H235V176C235 156 228 147 212 147C196 147 186 157 186 177V283H137V176C137 156 130 147 114 147C98 147 88 157 88 177V283H20Z"
            fill={color}
          />

          <path
            data-letter="a"
            className="origin-bottom will-change-transform"
            d="M387 108C339 108 300 147 300 196.5C300 246 339 285 387 285C409 285 428 277 442 263V283H472V114C472 112 470 110 468 110H442V130C428 116 409 108 387 108ZM387 241C362.5 241 343 221 343 196.5C343 172 362.5 152 387 152C411.5 152 431 172 431 196.5C431 221 411.5 241 387 241Z"
            fill={color}
          />

          <path
            data-letter="x"
            className="origin-bottom will-change-transform"
            d="M489 283L563 195L493 110H554L597 165L640 110H701L631 195L705 283H644L597 225L550 283H489Z"
            fill={color}
          />

          <rect data-letter="i1" className="origin-bottom will-change-transform" x="690" y="110" width="60" height="173" fill={color} />
          <rect data-letter="i2" className="origin-bottom will-change-transform" x="773" y="110" width="61" height="173" fill={color} />
          <rect data-letter="i3" className="origin-bottom will-change-transform" x="857" y="110" width="60" height="173" fill={color} />
        </g>

        <circle data-dot="1" className="origin-center will-change-transform" cx="720" cy="51" r="31" fill={dotColor} />
        <circle data-dot="2" className="origin-center will-change-transform" cx="803.5" cy="51" r="31" fill={dotColor} />
        <circle data-dot="3" className="origin-center will-change-transform" cx="887" cy="51" r="31" fill={dotColor} />
      </svg>
    </span>
  );
});

MaxiiiLogo.displayName = 'MaxiiiLogo';
