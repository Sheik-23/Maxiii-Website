import { createContext, useContext } from 'react';
import type { RouteTransitionType } from './transitions.config';

export interface TransitionState {
  isTransitioning: boolean;
  transitionType: RouteTransitionType;
  destinationColor: string;
}

export interface TransitionContextValue {
  state: TransitionState;
  navigateWithTransition: (to: string) => void;
}

export const TransitionContext = createContext<TransitionContextValue | null>(null);

export const useTransition = (): TransitionContextValue => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};

export const useTransitionNavigate = () => {
  const { navigateWithTransition } = useTransition();
  return navigateWithTransition;
};
