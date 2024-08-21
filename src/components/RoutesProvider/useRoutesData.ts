import { useContext } from 'react';
import { RoutesContext } from './context';

export default function useRoutesData() {
  const { routes } = useContext(RoutesContext);
  return routes;
}
