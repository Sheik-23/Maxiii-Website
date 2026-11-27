import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTransition } from './TransitionContext';
import { getLenis } from '../hooks/useLenis';

export interface TransitionLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> {
  to: string;
  children: React.ReactNode | ((props: { isActive: boolean }) => React.ReactNode);
  className?: string | ((props: { isActive: boolean }) => string);
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const TransitionLink = React.forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ to, children, className, onClick, ...rest }, ref) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state, navigateWithTransition } = useTransition();

    const [targetPath, hash] = to.split('#');
    const normalizedCurrent = location.pathname.replace(/\/+$/, '') || '/';
    const normalizedTargetPath = (targetPath || '/').replace(/\/+$/, '') || '/';
    const isSameRoute = normalizedCurrent === normalizedTargetPath;
    const isActive = isSameRoute && !hash;

    const computedClassName =
      typeof className === 'function' ? className({ isActive }) : className;

    const computedChildren =
      typeof children === 'function' ? children({ isActive }) : children;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e);
      }

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }

      // If clicking an in-page section hash on the current page
      if (isSameRoute && hash) {
        e.preventDefault();
        window.history.pushState(null, '', to);
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(targetElement, { offset: 0 });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        return;
      }

      // If clicking the current page without a hash
      if (isSameRoute && !hash) {
        e.preventDefault();
        if (location.hash) {
          navigate(normalizedTargetPath);
        }
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // If navigating between different pages (e.g. from /privacy to / or /#features)
      e.preventDefault();

      if (state.isTransitioning) {
        return;
      }

      navigateWithTransition(to);
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLAnchorElement>) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const touch = e.changedTouches[0];
        (e as any).__touchPos = {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    };

    return (
      <a
        ref={ref}
        href={to}
        className={computedClassName}
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
        aria-current={isActive ? 'page' : undefined}
        {...rest}
      >
        {computedChildren}
      </a>
    );
  }
);

TransitionLink.displayName = 'TransitionLink';
