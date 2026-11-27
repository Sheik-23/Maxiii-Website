import React from 'react';
import { TrainingFloorScene } from '../scenes/TrainingFloorScene/TrainingFloorScene';
import { MarqueeRibbon } from '../components/Marquee/MarqueeRibbon';
import { MagneticButton } from '../components/Button/MagneticButton';

export const TrainingPage: React.FC = () => {
  return (
    <main style={{ paddingTop: '60px' }}>
      <TrainingFloorScene />
      <MarqueeRibbon backgroundColor="var(--color-saffron)" textColor="var(--color-black)" />
      <div style={{ padding: '96px 24px', textAlign: 'center', background: 'var(--color-black)' }}>
        <MagneticButton to="/join">
          Join the waitlist
        </MagneticButton>
      </div>
    </main>
  );
};

