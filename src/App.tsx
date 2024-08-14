import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import AntdProvider from './components/AntdProvider';
import Loading from './components/Loading';
import './i18n';
import { router } from './router';
import { store } from './store';

export default function App() {
  return (
    <AntdProvider>
      <ReduxProvider store={store}>
        <Loading>
          <RouterProvider router={router} />
        </Loading>
      </ReduxProvider>
    </AntdProvider>
  );
}
