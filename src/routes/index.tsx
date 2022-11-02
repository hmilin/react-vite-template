import Loading from '@/components/Loading';
import Layout from '@/layouts';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));

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
    ],
  },
];

export default routes;
