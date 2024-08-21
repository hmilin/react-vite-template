import useForkRef from '@/hooks/useForkRef';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { ComponentType } from 'react';
import { forwardRef, useCallback, useRef } from 'react';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link as RouterLink, matchRoutes } from 'react-router-dom';
import useRoutesData from '../RoutesProvider/useRoutesData';
import type { LazyLoadResult } from '@/utils/lazy';

interface LinkProps extends RouterLinkProps {
  /** preload strategy */
  preload?: 'intent' | 'viewport' | false;
}

/**
 * 基于react-router-dom的Link组件实现了preload功能
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { preload, onMouseEnter, ...props },
  forwardedRef,
) {
  const preloadedComponent = useRef<ComponentType>();
  const elementRef = useRef<HTMLAnchorElement | null>(null);
  const mergedRef = useForkRef(elementRef, forwardedRef);

  const routes = useRoutesData();

  // preload component
  const preloadComponent = useCallback(() => {
    if (!preloadedComponent.current) {
      const matches = matchRoutes(routes, props.to);
      matches?.forEach((route) => {
        const loader = (route.route.Component as LazyLoadResult)?.preload;
        if (loader) {
          loader().then((module) => {
            preloadedComponent.current = module.default;
          });
        }
      });
    }
  }, [props.to, routes]);

  const handleMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      if (preload === 'intent') {
        preloadComponent();
      }
      onMouseEnter?.(e);
    },
    [preloadComponent, onMouseEnter, preload],
  );

  const preloadViewportIoCallback = useCallback(
    (entry: IntersectionObserverEntry | undefined) => {
      if (entry?.isIntersecting) {
        preloadComponent();
      }
    },
    [preloadComponent],
  );

  useIntersectionObserver<HTMLAnchorElement>(
    elementRef,
    preloadViewportIoCallback,
    {},
    { disabled: preload !== 'viewport' },
  );

  return <RouterLink ref={mergedRef} {...props} onMouseEnter={handleMouseEnter} />;
});

export default Link;
