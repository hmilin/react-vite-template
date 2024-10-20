import BuilderPage from '@/builder-page';
import Loading from '@/components/Loading';
import Layout from '@/components/layouts';
import { lazyLoad } from '@/utils/lazy';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Home = lazyLoad(() => import('@/pages/Home'));
const About = lazyLoad(() => import('@/pages/About'));

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
        Component: About,
      },
      {
        path: 'builder-demo',
        element: <BuilderPage />,
      },
    ],
  },
];

export default routes;
