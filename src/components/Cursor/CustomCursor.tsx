import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100, dotX: -100, dotY: -100 });
  const modeRef = useRef<'default' | 'link' | 'view'>('default');
  const visibleRef = useRef(false);
  const pressedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFinePointer(media.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    media.addEventListener('change', handleMediaChange);
    return () => media.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    let animId: number | null = null;

    const startLoop = () => {
      if (animId === null) {
        animId = requestAnimationFrame(updatePosition);
      }
    };

    const syncClasses = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      ring.dataset.mode = modeRef.current;
      ring.dataset.visible = visibleRef.current ? 'true' : 'false';
      ring.dataset.pressed = pressedRef.current ? 'true' : 'false';
      dot.dataset.mode = modeRef.current;
      dot.dataset.visible = visibleRef.current ? 'true' : 'false';
      dot.dataset.pressed = pressedRef.current ? 'true' : 'false';
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      visibleRef.current = true;

      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorAttrEl = target.closest('[data-cursor]') as HTMLElement | null;
        const cursorType = cursorAttrEl?.getAttribute('data-cursor');
        if (cursorType === 'view') {
          modeRef.current = 'view';
        } else if (
          cursorType === 'link' ||
          cursorType === 'pointer' ||
          target.closest('a, button, input, select, textarea, [role="button"], [tabindex="0"]')
        ) {
          modeRef.current = 'link';
        } else {
          modeRef.current = 'default';
        }
      } else {
        modeRef.current = 'default';
      }

      syncClasses();
      startLoop();
    };

    const handleMouseDown = () => {
      pressedRef.current = true;
      syncClasses();
      startLoop();
    };

    const handleMouseUp = () => {
      pressedRef.current = false;
      syncClasses();
      startLoop();
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      syncClasses();
      startLoop();
    };

    const handleMouseEnter = () => {
      visibleRef.current = true;
      syncClasses();
      startLoop();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const updatePosition = () => {
      const state = mouseRef.current;
      state.x += (state.targetX - state.x) * 0.2;
      state.y += (state.targetY - state.y) * 0.2;
      state.dotX += (state.targetX - state.dotX) * 0.55;
      state.dotY += (state.targetY - state.dotY) * 0.55;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${state.dotX}px, ${state.dotY}px, 0) translate(-50%, -50%)`;
      }

      const settled =
        Math.abs(state.targetX - state.x) < 0.05 &&
        Math.abs(state.targetY - state.y) < 0.05 &&
        Math.abs(state.targetX - state.dotX) < 0.05 &&
        Math.abs(state.targetY - state.dotY) < 0.05;

      if (settled) {
        animId = null;
      } else {
        animId = requestAnimationFrame(updatePosition);
      }
    };

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-6 h-6 border-[1.5px] border-[rgba(251,241,220,0.75)] rounded-full pointer-events-none z-[999999] mix-blend-difference opacity-0 transition-[width,height,border-color,background-color,opacity,border-width] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform data-[visible=true]:opacity-100 data-[mode=link]:w-11 data-[mode=link]:h-11 data-[mode=link]:border-saffron data-[mode=link]:bg-[rgba(255,138,31,0.14)] data-[mode=link]:mix-blend-normal data-[mode=view]:w-14 data-[mode=view]:h-14 data-[mode=view]:border-cream data-[mode=view]:bg-[rgba(251,241,220,0.08)] data-[pressed=true]:!w-[18px] data-[pressed=true]:!h-[18px] data-[pressed=true]:border-2"
        data-mode="default"
        data-visible="false"
        data-pressed="false"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full bg-saffron pointer-events-none z-[999999] opacity-0 transition-[width,height,opacity,background-color] duration-200 will-change-transform data-[visible=true]:opacity-100 data-[mode=link]:w-1.5 data-[mode=link]:h-1.5 data-[mode=view]:w-2 data-[mode=view]:h-2 data-[mode=view]:bg-cream data-[pressed=true]:!w-[10px] data-[pressed=true]:!h-[10px]"
        data-mode="default"
        data-visible="false"
        data-pressed="false"
        aria-hidden="true"
      />
    </>
  );
};
