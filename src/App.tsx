import React from 'react';
import { Navbar } from './components/Nav/Navbar';
import { Footer } from './components/Footer/Footer';
import { FilmOverlay } from './components/Grain/FilmOverlay';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { TransitionProvider } from './transitions/TransitionProvider';
import { CookieBanner } from './components/CookieBanner/CookieBanner';
import { useLenis } from './hooks/useLenis';

export const App: React.FC = () => {
  useLenis();

  return (
    <TransitionProvider>
      <CustomCursor />
      <FilmOverlay />
      <Navbar />
      <Footer />
      <CookieBanner />
    </TransitionProvider>
  );
};
