/**
 * MAXIII Motion System Tokens
 * Strict adherence to the unified motion language:
 * - Three durations: 0.4s, 0.8s, 1.4s
 * - Two easings: strong ease-out for entrances, soft ease-in-out for scroll-linked movement
 * - One stagger rule: 60ms (0.06s)
 * - Smooth and confident: no bounce, no spin, no flashing.
 */

export const MOTION_DURATIONS = {
  micro: 0.4,
  fast: 0.4,
  standard: 0.8,
  base: 0.8,
  ambient: 1.4,
  slow: 1.4
} as const;

export const MOTION_EASINGS = {
  // CSS cubic-bezier strings
  strongEaseOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  softEaseInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
  dramaticEnter: 'cubic-bezier(0.16, 1, 0.3, 1)',
  smoothExit: 'cubic-bezier(0.42, 0, 0.58, 1)',

  // GSAP-optimized easing curves
  gsapStrongEaseOut: 'power3.out',
  gsapSoftEaseInOut: 'power1.inOut',
  gsapDramaticEnter: 'power3.out',
  gsapSmoothExit: 'power1.inOut',
  gsapPunchyBounce: 'power3.out', // No bounce: smooth and confident
  gsapScrub: 'none'
} as const;

export const MOTION_STAGGER = {
  base: 0.06, // 60ms
  tight: 0.06,
  relaxed: 0.06
} as const;

export interface MotionConfig {
  durations: typeof MOTION_DURATIONS;
  easings: typeof MOTION_EASINGS;
  stagger: typeof MOTION_STAGGER;
}

export const motionTokens: MotionConfig = {
  durations: MOTION_DURATIONS,
  easings: MOTION_EASINGS,
  stagger: MOTION_STAGGER
};

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
