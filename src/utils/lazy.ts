import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy } from 'react';

export type LazyLoadResult<T extends ComponentType<any> = ComponentType<any>> =
  LazyExoticComponent<T> & {
    preload: () => Promise<{ default: T }>;
  };

export function lazyLoad<T extends ComponentType<any>>(
  load: () => Promise<{ default: T }>,
): LazyLoadResult<T> {
  let preloaded = false;
  let loadedComponent: { default: T };
  const loadComponent = async () => {
    if (preloaded) return loadedComponent;
    loadedComponent = await load().then((res) => {
      preloaded = true;
      return res;
    });
    return loadedComponent;
  };
  const preload = loadComponent;
  const lazyComponent: any = lazy(loadComponent);
  lazyComponent.preload = preload;

  return lazyComponent as LazyLoadResult<T>;
}
