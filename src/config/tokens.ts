export const POSTER_COLORS = {
  cobalt: '#1428D0',
  mustard: '#EBB945',
  deepRed: '#7C0F0F',
  burntOrange: '#E4501A',
  black: '#000000',
  cream: '#FBF1DC'
} as const;

export type PosterColorKey = keyof typeof POSTER_COLORS;

export const TOKENS = {
  colors: {
    ...POSTER_COLORS,
    saffron: '#FF8A1F', // Brand accent, matches app
    white: '#FFFFFF',
    darkUi: '#0B0B0E',
    darkSurface: '#141418',
    darkCard: '#1C1C22',
    darkBorder: 'rgba(255, 255, 255, 0.08)'
  },
  fonts: {
    display: "'Anton', Impact, 'Arial Narrow', sans-serif",
    serif: "'Bodoni Moda', 'Didot', 'Bodoni MT', Georgia, serif",
    sans: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, sans-serif",
    mono: "'SF Mono', Menlo, Consolas, monospace"
  },
  timings: {
    preloader: 1.8,
    pageTransition: 0.7,
    hoverFast: 0.18,
    easeOutQuint: [0.22, 1, 0.36, 1],
    easeCustom: [0.16, 1, 0.3, 1]
  }
} as const;
