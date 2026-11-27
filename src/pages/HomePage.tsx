import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroScene } from '../scenes/HeroScene/HeroScene';
import { MacrosScene } from '../scenes/MacrosScene/MacrosScene';
import { HomeFoodScene } from '../scenes/HomeFoodScene/HomeFoodScene';
import { AdaptiveTargetScene } from '../scenes/AdaptiveTargetScene/AdaptiveTargetScene';
import { TrainingFloorScene } from '../scenes/TrainingFloorScene/TrainingFloorScene';
import { BarcodeScannerScene } from '../scenes/BarcodeScannerScene/BarcodeScannerScene';
import { JoinScene } from '../scenes/JoinScene/JoinScene';
import { MarqueeRibbon } from '../components/Marquee/MarqueeRibbon';
import { PosterStack, type PosterItem } from '../components/PosterStack/PosterStack';
import { POSTER_COLORS } from '../config/tokens';
import { getLenis } from '../hooks/useLenis';

export const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const pathTarget = location.pathname.replace(/^\//, '').toLowerCase();
    const hashTarget = location.hash.replace(/^#/, '').toLowerCase();

    if (['training', 'scanner', 'join'].includes(pathTarget)) {
      window.history.replaceState(null, '', `/#${pathTarget}`);
    }

    const scrollTarget = ['training', 'scanner', 'join'].includes(pathTarget)
      ? pathTarget
      : ['features', 'training', 'scanner', 'join'].includes(hashTarget)
        ? hashTarget
        : null;

    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        const timer = setTimeout(() => {
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(el, { offset: 0 });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, location.hash]);

  const posters: PosterItem[] = [
    {
      id: 'hero',
      component: (
        <>
          <HeroScene />
          <MarqueeRibbon backgroundColor={POSTER_COLORS.mustard} textColor={POSTER_COLORS.black} />
        </>
      ),
      color: POSTER_COLORS.cobalt
    },
    {
      id: 'features',
      component: <MacrosScene />,
      color: POSTER_COLORS.mustard
    },
    {
      id: 'home-food',
      component: <HomeFoodScene />,
      color: POSTER_COLORS.deepRed
    },
    {
      id: 'adaptive',
      component: <AdaptiveTargetScene />,
      color: POSTER_COLORS.black
    },
    {
      id: 'training',
      component: <TrainingFloorScene />,
      color: POSTER_COLORS.cobalt
    },
    {
      id: 'scanner',
      component: <BarcodeScannerScene />,
      color: POSTER_COLORS.burntOrange
    },
    {
      id: 'join',
      component: <JoinScene />,
      color: POSTER_COLORS.deepRed
    }
  ];

  return (
    <main>
      <PosterStack posters={posters} />
    </main>
  );
};
