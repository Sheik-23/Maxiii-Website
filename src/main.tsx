import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'lenis/dist/lenis.css';
import { App } from './App';
import './index.css';

if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (navEntry?.type === 'reload') {
    if (window.location.pathname !== '/' || window.location.hash || window.location.search) {
      window.history.replaceState(null, '', '/');
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

