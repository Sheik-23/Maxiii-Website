import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../motion/tokens';

interface HalftoneMoonProps {
  className?: string;
  size?: number;
  rotateOnScroll?: boolean;
}

export const HalftoneMoon: React.FC<HalftoneMoonProps> = ({
  className = '',
  size = 480,
  rotateOnScroll = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = prefersReducedMotion();
    const isCoarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1.5 : 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    let animId: number | null = null;
    let isVisible = true;
    const startTime = performance.now();

    const cols = 44;
    const rows = 44;
    const radius = size * dpr * 0.42;
    const centerX = (size * dpr) / 2;
    const centerY = (size * dpr) / 2;

    // Animated light target — updated by pointer, lerped each frame
    const targetLight = { x: -0.55, y: -0.35, z: 0.75 };
    const currentLight = { x: -0.55, y: -0.35, z: 0.75 };

    let scrollRotation = 0;
    let pointerDirty = false;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const handleScroll = () => {
      if (!reducedMotion && rotateOnScroll) {
        scrollRotation = window.scrollY * 0.0015;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || reducedMotion || !containerRef.current) return;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      pointerDirty = true;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const render = (time: number) => {
      if (!isVisible) {
        animId = null;
        return;
      }

      if (pointerDirty && containerRef.current) {
        pointerDirty = false;
        const rect = containerRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.5;
        const dx = Math.max(-1, Math.min(1, (lastPointerX - cx) / (rect.width * 0.65 || 1)));
        const dy = Math.max(-1, Math.min(1, -(lastPointerY - cy) / (rect.height * 0.65 || 1)));
        const len = Math.hypot(dx, dy, 0.85);
        targetLight.x = dx / len;
        targetLight.y = dy / len;
        targetLight.z = 0.85 / len;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly interpolate light position toward pointer target
      currentLight.x += (targetLight.x - currentLight.x) * 0.08;
      currentLight.y += (targetLight.y - currentLight.y) * 0.08;
      currentLight.z += (targetLight.z - currentLight.z) * 0.08;
      const lLen = Math.hypot(currentLight.x, currentLight.y, currentLight.z) || 1;
      const lx = currentLight.x / lLen;
      const ly = currentLight.y / lLen;
      const lz = currentLight.z / lLen;

      const elapsed = (time - startTime) * 0.001;
      const buildProgress = reducedMotion ? 1.0 : Math.min(1.0, elapsed / 1.4);
      const easeOut = 1 - Math.pow(1 - buildProgress, 3);

      const baseAngle = reducedMotion ? 0 : elapsed * 0.15;
      const totalAngle = baseAngle + scrollRotation;

      for (let r = 0; r < rows; r++) {
        // Offset by 0.5 to avoid pole singularity clumping
        const lat = ((r + 0.5) / rows - 0.5) * Math.PI;
        const y = Math.sin(lat);
        const cosLat = Math.cos(lat);
        const colsAtLat = Math.max(4, Math.round(cols * cosLat));

        for (let c = 0; c < colsAtLat; c++) {
          const baseLon = (c / colsAtLat) * 2 * Math.PI;
          const lon = baseLon + totalAngle;

          const x = cosLat * Math.sin(lon);
          const z = cosLat * Math.cos(lon);
          if (z <= 0) continue;

          const distToLight = Math.hypot(x - lx, y - ly, z - lz);
          const radialGrowth = Math.max(0, Math.min(1, (easeOut * 2.4 - distToLight) * 2.2));
          const dot = x * lx + y * ly + z * lz;
          const intensity = Math.max(0, dot);

          const screenX = centerX + x * radius;
          const screenY = centerY - y * radius;

          const baseRadius = Math.max(0.6 * dpr, intensity * 5.2 * dpr * (0.8 + 0.2 * z));
          const dotRadius = baseRadius * radialGrowth;

          if (dotRadius > 0.2) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
            // 3-tone: bright highlight / saffron-orange mid / amber base
            ctx.fillStyle =
              intensity > 0.58 ? '#FBF1DC' : intensity > 0.28 ? '#FF8A1F' : '#EBB945';
            ctx.fill();
          }
        }
      }

      if (!reducedMotion && isVisible) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const wasVisible = isVisible;
          isVisible = e.isIntersecting;
          if (!wasVisible && isVisible && !reducedMotion && animId === null) {
            animId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    animId = requestAnimationFrame(render);

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [size, rotateOnScroll]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block rounded-full" />
    </div>
  );
};
