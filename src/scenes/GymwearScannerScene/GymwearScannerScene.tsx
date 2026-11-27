import React from 'react';
import { TrainingFloorScene } from '../TrainingFloorScene/TrainingFloorScene';
import { BarcodeScannerScene } from '../BarcodeScannerScene/BarcodeScannerScene';

export const GymwearScannerScene: React.FC = () => {
  return (
    <>
      <TrainingFloorScene />
      <BarcodeScannerScene />
    </>
  );
};
