/**
 * MAXIII Transitions Configuration
 * Maps route pairs to the unified curved sheet route transition and shared poster color tokens.
 */
import { POSTER_COLORS, type PosterColorKey } from '../config/tokens';

export { POSTER_COLORS, type PosterColorKey };

export type RouteTransitionType = 'curved-sheet' | 'short-fade';

export interface RouteMeta {
  name: string;
  color: string;
  textColor: string;
}

export const ROUTE_REGISTRY: Record<string, RouteMeta> = {
  '/': {
    name: 'Overview',
    color: POSTER_COLORS.cobalt,
    textColor: POSTER_COLORS.cream
  },
  '/features': {
    name: 'Features',
    color: POSTER_COLORS.cobalt,
    textColor: POSTER_COLORS.cream
  },
  '/training': {
    name: 'Training',
    color: POSTER_COLORS.cobalt,
    textColor: POSTER_COLORS.cream
  },
  '/scanner': {
    name: 'Scanner',
    color: POSTER_COLORS.burntOrange,
    textColor: POSTER_COLORS.cream
  },
  '/join': {
    name: 'Join',
    color: POSTER_COLORS.deepRed,
    textColor: POSTER_COLORS.cream
  },
  '/privacy': {
    name: 'Privacy Policy',
    color: POSTER_COLORS.cream,
    textColor: POSTER_COLORS.black
  },
  '/privacy-policy': {
    name: 'Privacy Policy',
    color: POSTER_COLORS.cream,
    textColor: POSTER_COLORS.black
  },
  '/terms': {
    name: 'Terms and Conditions',
    color: POSTER_COLORS.cream,
    textColor: POSTER_COLORS.black
  },
  '/terms-and-conditions': {
    name: 'Terms and Conditions',
    color: POSTER_COLORS.cream,
    textColor: POSTER_COLORS.black
  },
  '/cookie-policy': {
    name: 'Cookie Policy',
    color: POSTER_COLORS.cream,
    textColor: POSTER_COLORS.black
  },
  '/contact': {
    name: 'Contact',
    color: POSTER_COLORS.cream,
    textColor: POSTER_COLORS.black
  }
};

export const getRouteMeta = (path: string): RouteMeta => {
  const normalized = path.replace(/\/+$/, '') || '/';
  if (ROUTE_REGISTRY[normalized]) {
    return ROUTE_REGISTRY[normalized];
  }
  return {
    name: 'Page Not Found',
    color: POSTER_COLORS.black,
    textColor: POSTER_COLORS.cream
  };
};

export interface ResolvedTransition {
  type: RouteTransitionType;
  destinationColor: string;
  overlayBgColor?: string;
  overlayLogoColor?: string;
  overlayDotColor?: string;
}

const isLegalPath = (p: string) => {
  const norm = p.replace(/\/+$/, '') || '/';
  return (
    norm === '/privacy' ||
    norm === '/privacy-policy' ||
    norm === '/terms' ||
    norm === '/terms-and-conditions' ||
    norm === '/cookie-policy' ||
    norm === '/contact'
  );
};

const isFeaturesPath = (p: string) => {
  const norm = p.replace(/\/+$/, '') || '/';
  return norm === '/features';
};

const normalizePath = (p: string) => p.replace(/\/+$/, '') || '/';

export const resolveTransition = (
  fromPath: string,
  toPath: string,
  _isPopState: boolean = false
): ResolvedTransition => {
  const from = normalizePath(fromPath.split('#')[0]);
  const to = normalizePath(toPath.split('#')[0]);

  // Features page transition: Cream background with maxiii logo
  if (isFeaturesPath(to) || isFeaturesPath(from)) {
    return {
      type: 'short-fade',
      destinationColor: '#f5eddf',
      overlayBgColor: '#f5eddf',
      overlayLogoColor: '#f59e0b',
      overlayDotColor: '#f59e0b'
    };
  }

  // Legal pages transition: Cream background with maxiii logo
  if (isLegalPath(to) || isLegalPath(from)) {
    return {
      type: 'short-fade',
      destinationColor: '#f5eddf',
      overlayBgColor: '#f5eddf',
      overlayLogoColor: '#f59e0b',
      overlayDotColor: '#f59e0b'
    };
  }

  // All other page transitions use the same elegant cream loading screen
  return {
    type: 'short-fade',
    destinationColor: '#f5eddf',
    overlayBgColor: '#f5eddf',
    overlayLogoColor: '#f59e0b',
    overlayDotColor: '#f59e0b'
  };
};
