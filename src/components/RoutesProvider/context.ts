import { createContext } from 'react';
import type { RouteObject } from 'react-router';

export const RoutesContext = createContext<{
  routes: RouteObject[];
}>({ routes: [] });
