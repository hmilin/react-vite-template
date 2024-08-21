import type { PropsWithChildren } from 'react';
import type { RouteObject } from 'react-router';
import { RoutesContext } from './context';

interface RoutesProviderProps {
  routes: RouteObject[];
}

const RoutesProvider: React.FC<PropsWithChildren<RoutesProviderProps>> = ({ children, routes }) => {
  return <RoutesContext.Provider value={{ routes }}>{children}</RoutesContext.Provider>;
};

export default RoutesProvider;
