import useForkRef from '@/hooks/useForkRef';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { ComponentType } from 'react';
import { forwardRef, useCallback, useRef } from 'react';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps extends RouterLinkProps {
  /** preload strategy */
  preload?: 'intent' | 'viewport' | false;
  /** TODO autoload by the matched route? */
  loader?: () => Promise<{ default: ComponentType }>;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { preload, loader, onMouseEnter, ...props },
  forwardedRef,
) {
  const preloadedComponent = useRef<ComponentType>();
  const elementRef = useRef<HTMLAnchorElement | null>(null);
  const mergedRef = useForkRef(elementRef, forwardedRef);

  // preload component
  const preloadComponent = useCallback(() => {
    if (!preloadedComponent.current && loader) {
      loader().then((module) => {
        preloadedComponent.current = module.default;
      });
    }
  }, [loader]);

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
