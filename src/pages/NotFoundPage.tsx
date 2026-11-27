import React from 'react';
import { MagneticButton } from '../components/Button/MagneticButton';

export const NotFoundPage: React.FC = () => {
  return (
    <main
      className="min-h-svh bg-deep-red text-cream flex flex-col justify-between pt-[calc(90px+env(safe-area-inset-top))] px-10 pb-[calc(48px+env(safe-area-inset-bottom))] box-border overflow-hidden relative"
      aria-label="Page Not Found"
    >
      <div className="relative my-auto flex flex-col items-center justify-center text-center z-[5]">
        <div className="font-display text-[clamp(6rem,24vw,22rem)] leading-[0.82] tracking-[-0.04em] uppercase [-webkit-text-stroke:3px_#FBF1DC] text-transparent select-none">
          404
        </div>
        <h1 className="font-serif italic text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.1] mt-4 mb-3">
          Page not found.
        </h1>
        <p className="font-serif text-[clamp(1rem,1.6vw,1.25rem)] opacity-85 max-w-[480px] mb-8">
          The page you requested does not exist or has moved.
        </p>
        <MagneticButton to="/" variant="outline">
          Return to home
        </MagneticButton>
      </div>

      <footer className="flex justify-between border-t border-[rgba(251,241,220,0.3)] pt-4 font-mono text-[11px] tracking-[0.08em] uppercase z-10">
        <span />
        <span>MAXIII</span>
      </footer>
    </main>
  );
};
