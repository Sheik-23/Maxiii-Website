import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  resolveTransition,
  getRouteMeta,
  type RouteTransitionType
} from './transitions.config';
import {
  TransitionContext,
  type TransitionState
} from './TransitionContext';
import { resetScroll, getLenis } from '../hooks/useLenis';
import { prefersReducedMotion } from '../motion/tokens';
import { SEO_CONFIG } from '../config/seo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HomePage } from '../pages/HomePage';
import maxiiiPng from '../assets/maxiii.png';

const loadFeaturesPage = () => import('../pages/FeaturesPage');
const loadPrivacyPage = () => import('../pages/PrivacyPage');
const loadTermsPage = () => import('../pages/TermsPage');
const loadCookiePolicyPage = () => import('../pages/CookiePolicyPage');
const loadContactPage = () => import('../pages/ContactPage');
const loadNotFoundPage = () => import('../pages/NotFoundPage');

const FeaturesPage = lazy(() => loadFeaturesPage().then((m) => ({ default: m.FeaturesPage })));
const PrivacyPage = lazy(() => loadPrivacyPage().then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => loadTermsPage().then((m) => ({ default: m.TermsPage })));
const CookiePolicyPage = lazy(() => loadCookiePolicyPage().then((m) => ({ default: m.CookiePolicyPage })));
const ContactPage = lazy(() => loadContactPage().then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => loadNotFoundPage().then((m) => ({ default: m.NotFoundPage })));

const preloadRouteChunk = (pathname: string): Promise<unknown> | void => {
  const norm = pathname.replace(/\/+$/, '') || '/';
  if (norm === '/features') return loadFeaturesPage();
  if (norm === '/privacy' || norm === '/privacy-policy') return loadPrivacyPage();
  if (norm === '/terms' || norm === '/terms-and-conditions') return loadTermsPage();
  if (norm === '/cookie-policy') return loadCookiePolicyPage();
  if (norm === '/contact') return loadContactPage();
  if (norm !== '/' && norm !== '/training' && norm !== '/scanner' && norm !== '/join') {
    return loadNotFoundPage();
  }
};

gsap.registerPlugin(ScrollTrigger);

export interface TransitionProviderProps {
  children?: React.ReactNode;
}

const parsePathAndHash = (
  target: string,
  fallbackPath: string = '/'
): { cleanPath: string; hash: string | null } => {
  if (!target) return { cleanPath: fallbackPath, hash: null };
  const [rawPath, rawHash] = target.split('#');
  const pathPart = rawPath ? (rawPath.replace(/\/+$/, '') || '/') : fallbackPath;
  return {
    cleanPath: pathPart,
    hash: rawHash || null
  };
};

export const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activePath, setActivePath] = useState(location.pathname);
  const [transitionType, setTransitionType] = useState<RouteTransitionType>('short-fade');
  const [sheetColor, setSheetColor] = useState<string>('#000000');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayTheme, setOverlayTheme] = useState<{
    bg: string;
    logoColor: string;
    dotColor: string;
  }>({
    bg: '#f5eddf',
    logoColor: '#f59e0b',
    dotColor: '#f59e0b'
  });

  const sheetRef = useRef<HTMLDivElement>(null);
  const incomingLayerRef = useRef<HTMLDivElement>(null);
  const logoOverlayRef = useRef<HTMLDivElement>(null);

  const activePathRef = useRef(activePath);
  activePathRef.current = activePath;

  const isTransitioningRef = useRef(isTransitioning);
  isTransitioningRef.current = isTransitioning;

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const updateTitle = useCallback((pathname: string) => {
    const meta = getRouteMeta(pathname);
    if (meta.name === 'Overview') {
      document.title = SEO_CONFIG.title;
    } else if (meta.name === 'Features') {
      document.title = SEO_CONFIG.featuresTitle;
    } else {
      document.title = `${meta.name} | MAXIII`;
    }
  }, []);

  const renderRouteComponent = (pathname: string) => {
    const norm = pathname.replace(/\/+$/, '') || '/';
    if (norm === '/') return <HomePage />;
    if (norm === '/features') return <FeaturesPage />;
    if (norm === '/training' || norm === '/scanner' || norm === '/join') return <HomePage />;
    if (norm === '/privacy' || norm === '/privacy-policy') return <PrivacyPage />;
    if (norm === '/terms' || norm === '/terms-and-conditions') return <TermsPage />;
    if (norm === '/cookie-policy') return <CookiePolicyPage />;
    if (norm === '/contact') return <ContactPage />;
    return <NotFoundPage />;
  };

  const scrollToHash = useCallback((hash: string) => {
    const el = document.getElementById(hash);
    if (el) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el, { offset: 0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  const runRouteTransition = useCallback(
    async (targetPath: string, isPopState: boolean = false) => {
      const { cleanPath: cleanTarget, hash } = parsePathAndHash(targetPath);
      const { cleanPath: currentClean } = parsePathAndHash(activePathRef.current);

      // Same-page navigation (e.g. #join on current page, or re-clicking current page)
      if (cleanTarget === currentClean) {
        if (hash) {
          if (!isPopState) {
            window.history.pushState(null, '', targetPath);
          }
          scrollToHash(hash);
        } else {
          if (!isPopState) {
            window.history.pushState(null, '', targetPath);
          }
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(0);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
        return;
      }

      // If already transitioning
      if (isTransitioningRef.current) {
        if (isPopState) {
          // Rapid back/forward navigation: reset active tweens to sync immediately
          if (sheetRef.current) gsap.killTweensOf(sheetRef.current);
          if (logoOverlayRef.current) {
            gsap.killTweensOf(logoOverlayRef.current);
            gsap.set(logoOverlayRef.current, { opacity: 0, visibility: 'hidden' });
          }
          if (incomingLayerRef.current) {
            gsap.killTweensOf(incomingLayerRef.current);
            gsap.set(incomingLayerRef.current, { opacity: 1 });
          }
        } else {
          return;
        }
      }

      isTransitioningRef.current = true;
      setIsTransitioning(true);

      try {
        const chunkPromise = preloadRouteChunk(cleanTarget);
        const isReduced = prefersReducedMotion();
        const {
          type,
          destinationColor,
          overlayBgColor = '#f5eddf',
          overlayLogoColor = '#f59e0b',
          overlayDotColor = '#f59e0b'
        } = resolveTransition(currentClean, cleanTarget, isPopState);

        setTransitionType(type);
        setSheetColor(destinationColor);
        setOverlayTheme({
          bg: overlayBgColor,
          logoColor: overlayLogoColor,
          dotColor: overlayDotColor
        });

        // 1. Logo Screen Route Transition (Features, Legal pages, and all page transitions)
        if (type === 'short-fade' || isReduced) {
          const fadeDuration = isReduced ? 0.15 : 0.28;
          const logoEl = logoOverlayRef.current;

          if (logoEl) {
            const imgEl = logoEl.querySelector('img');
            logoEl.style.backgroundColor = overlayBgColor;
            gsap.set(logoEl, { visibility: 'visible', opacity: 0 });
            if (imgEl) {
              gsap.fromTo(
                imgEl,
                { scale: 0.94, opacity: 0.75 },
                { scale: 1, opacity: 1, duration: fadeDuration + 0.1, ease: 'power3.out' }
              );
            }
            await new Promise<void>((resolve) => {
              gsap.to(logoEl, {
                opacity: 1,
                duration: fadeDuration,
                ease: 'power2.out',
                onComplete: () => resolve()
              });
            });
          }

          if (typeof document !== 'undefined') {
            document.documentElement.style.backgroundColor = overlayBgColor;
            document.body.style.backgroundColor = overlayBgColor;
          }

          await Promise.all([resetScroll(), chunkPromise]);
          if (!isPopState) {
            navigate(targetPath);
          }
          if (isMountedRef.current) {
            setActivePath(cleanTarget);
          }
          updateTitle(cleanTarget);

          // Give DOM a frame to mount and paint new page under the saffron screen
          await new Promise((r) => setTimeout(r, 60));

          // Ensure dark-background routes do not retain PosterStack cobalt or overlay cream
          if (
            typeof document !== 'undefined' &&
            cleanTarget !== '/' &&
            cleanTarget !== '/features' &&
            cleanTarget !== '/training' &&
            cleanTarget !== '/scanner' &&
            cleanTarget !== '/join'
          ) {
            document.documentElement.style.backgroundColor = '#000000';
            document.body.style.backgroundColor = '#000000';
          }

          if (logoEl) {
            await new Promise<void>((resolve) => {
              gsap.to(logoEl, {
                opacity: 0,
                duration: isReduced ? 0.15 : 0.32,
                ease: 'power2.inOut',
                onComplete: () => {
                  gsap.set(logoEl, { visibility: 'hidden' });
                  resolve();
                }
              });
            });
          }

          ScrollTrigger.refresh();

          if (hash) {
            setTimeout(() => {
              scrollToHash(hash);
            }, 60);
          }
          return;
        }

        // 2. Unified Curved Sheet Route Transition (Overview <-> Features)
        const sheetEl = sheetRef.current;
        if (sheetEl) {
          await new Promise<void>((resolve) => {
            const tl = gsap.timeline({
              onComplete: () => {
                gsap.set(sheetEl, { y: 'calc(100vh + 160px)' });
                resolve();
              }
            });

            // Phase 1: Sheet rises from bottom to cover screen (0.42s)
            tl.fromTo(
              sheetEl,
              { y: 'calc(100vh + 160px)' },
              { y: 0, duration: 0.42, ease: 'power2.inOut' }
            );

            // Mid-point callback: Swap route and reset scroll under the sheet
            tl.call(async () => {
              await Promise.all([resetScroll(), chunkPromise]);
              if (!isPopState) {
                navigate(targetPath);
              }
              if (isMountedRef.current) {
                setActivePath(cleanTarget);
              }
              if (typeof document !== 'undefined') {
                document.documentElement.style.backgroundColor = destinationColor;
                document.body.style.backgroundColor = destinationColor;
              }
              updateTitle(cleanTarget);
              if (hash) {
                setTimeout(() => {
                  scrollToHash(hash);
                }, 60);
              }
            });

            // Small pause for paint under cover
            tl.to({}, { duration: 0.05 });

            // Phase 2: Sheet continues upward off screen to reveal new page (0.43s)
            tl.to(sheetEl, {
              y: 'calc(-100vh - 160px)',
              duration: 0.43,
              ease: 'power2.inOut'
            });
          });

          ScrollTrigger.refresh();
        } else {
          await Promise.all([resetScroll(), chunkPromise]);
          if (isMountedRef.current) {
            setActivePath(cleanTarget);
          }
          if (typeof document !== 'undefined') {
            document.documentElement.style.backgroundColor = destinationColor;
            document.body.style.backgroundColor = destinationColor;
          }
          if (!isPopState) {
            navigate(targetPath);
          }
          ScrollTrigger.refresh();
          updateTitle(cleanTarget);
        }
      } finally {
        if (isMountedRef.current) {
          setIsTransitioning(false);
        }
        isTransitioningRef.current = false;
        if (logoOverlayRef.current) {
          gsap.set(logoOverlayRef.current, { opacity: 0, visibility: 'hidden' });
        }
      }
    },
    [navigate, updateTitle, scrollToHash]
  );

  const navigateWithTransition = useCallback(
    (to: string) => {
      runRouteTransition(to, false);
    },
    [runRouteTransition]
  );

  useEffect(() => {
    const handlePopState = () => {
      const targetPath = window.location.pathname + window.location.hash;
      runRouteTransition(targetPath, true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [runRouteTransition]);

  useEffect(() => {
    updateTitle(location.pathname);
  }, [location.pathname, updateTitle]);

  const transitionState: TransitionState = {
    isTransitioning,
    transitionType,
    destinationColor: sheetColor
  };

  return (
    <TransitionContext.Provider value={{ state: transitionState, navigateWithTransition }}>
      <div className="relative w-full min-h-svh overflow-x-clip">
        <div
          ref={incomingLayerRef}
          id="main-content"
          tabIndex={-1}
          className="relative w-full min-h-svh z-20 focus:outline-none"
        >
          <Suspense fallback={null}>
            {renderRouteComponent(activePath)}
          </Suspense>
        </div>

        {/* Loading Screen Route Transition Overlay */}
        <div
          ref={logoOverlayRef}
          className="fixed inset-0 w-screen h-screen supports-[height:100dvh]:h-dvh bg-[#f5eddf] z-[99995] flex items-center justify-center pointer-events-none opacity-0 invisible will-change-[opacity]"
          style={{ backgroundColor: overlayTheme.bg }}
          aria-hidden="true"
        >
          <div className="flex items-center justify-center p-6">
            <img
              src={maxiiiPng}
              alt="MAXIII"
              className="block h-[clamp(38px,6vw,54px)] w-auto max-w-[min(240px,80vw)] object-contain select-none pointer-events-none will-change-[transform,opacity]"
              width={180}
              height={53}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Unified Curved Sheet Overlay: no text, no logo, pure destination color */}
        <div
          ref={sheetRef}
          className={`fixed top-0 left-0 w-full h-screen z-[99990] will-change-transform ${
            isTransitioning && transitionType === 'curved-sheet'
              ? 'visible opacity-100 pointer-events-auto'
              : 'invisible opacity-0 pointer-events-none'
          }`}
          style={{ backgroundColor: isTransitioning ? sheetColor : 'transparent' }}
          aria-hidden="true"
        >
          <svg className="absolute -top-[119px] left-0 w-full h-[120px] pointer-events-none" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 Q720,0 1440,120 L1440,120 L0,120 Z" fill={isTransitioning ? sheetColor : 'transparent'} />
          </svg>
        </div>
      </div>
      {children}
    </TransitionContext.Provider>
  );
};
