import Loading from '@/components/Loading';
import Layout from '@/components/layouts';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: 'home',
        element: (
          <Loading>
            <Home />
          </Loading>
        ),
      },
      {
        path: 'about',
        element: (
          <Loading>
            <About />
          </Loading>
        ),
      },
    ],
  },
];

export default routes;
