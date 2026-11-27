import React from 'react';
import { BarcodeScannerScene } from '../scenes/BarcodeScannerScene/BarcodeScannerScene';
import { MarqueeRibbon } from '../components/Marquee/MarqueeRibbon';
import { MagneticButton } from '../components/Button/MagneticButton';

export const ScannerPage: React.FC = () => {
  return (
    <main style={{ paddingTop: '60px' }}>
      <BarcodeScannerScene />
      <MarqueeRibbon backgroundColor="var(--color-black)" textColor="var(--color-cream)" />
      <div style={{ padding: '96px 24px', textAlign: 'center', background: 'var(--color-black)' }}>
        <MagneticButton to="/join">
          Join the waitlist
        </MagneticButton>
      </div>
    </main>
  );
};

