import React from 'react';

export const FilmOverlay: React.FC = () => {
  return (
    <>
      <div
        className="fixed -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none z-[9999] opacity-[0.055] bg-[url('/textures/grain.svg')] animate-[grainJitter_0.35s_steps(3)_infinite] [@media(hover:none)_and_(pointer:coarse)]:animate-none motion-reduce:animate-none motion-reduce:opacity-[0.03]"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9998] opacity-40 bg-[url('/textures/film-scratches.svg')] bg-repeat animate-[scratchFlicker_4s_steps(4)_infinite] [@media(hover:none)_and_(pointer:coarse)]:animate-none motion-reduce:animate-none motion-reduce:opacity-[0.03]"
        aria-hidden="true"
      />
    </>
  );
};
