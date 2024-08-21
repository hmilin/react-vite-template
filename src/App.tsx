import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import AntdProvider from './components/AntdProvider';
import Loading from './components/Loading';
import RoutesProvider from './components/RoutesProvider';
import './i18n';
import { router } from './router';
import routes from './routes';
import { store } from './store';

export default function App() {
  return (
    <AntdProvider>
      <ReduxProvider store={store}>
        <Loading>
          <RoutesProvider routes={routes}>
            <RouterProvider router={router} />
          </RoutesProvider>
        </Loading>
      </ReduxProvider>
    </AntdProvider>
  );
}
