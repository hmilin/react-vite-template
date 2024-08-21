import type { LazyLoadResult } from '@/utils/lazy';
import { useEffect } from 'react';

export default function usePreloadOnMount(componentLoader: LazyLoadResult) {
  useEffect(() => {
    componentLoader.preload?.();
  }, [componentLoader]);
}
