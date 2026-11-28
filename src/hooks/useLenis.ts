import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let activeLenis: Lenis | null = null;

export const getLenis = () => activeLenis;

export const resetScroll = async () => {
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo(0, 0);
  if (document.fonts) {
    await document.fonts.ready;
  }
  ScrollTrigger.refresh();
};

export function useLenis() {
  useEffect(() => {
    // Respect prefers-reduced-motion: Lenis off
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95
    });
    activeLenis = lenis;

    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (navEntry?.type === 'reload' || !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      lenis.scrollTo(0, { immediate: true, force: true });
    }

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    let isMounted = true;

    // Refresh triggers after fonts are ready
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (isMounted) {
          ScrollTrigger.refresh();
        }
      });
    }

    return () => {
      isMounted = false;
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      activeLenis = null;
    };
  }, []);
}
