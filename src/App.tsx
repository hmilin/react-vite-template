import { ConfigProvider as AntdConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Provider as ReduxProvider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import Loading from './components/Loading';
import routes from './routes';
import { store } from './store';
import history from '@/utils/history';
import theme from './styles/theme';

export default function App() {
  const element = useRoutes(routes, history.location);

  return (
    <AntdConfigProvider locale={zhCN} theme={theme}>
      <ReduxProvider store={store}>
        <Loading>{element}</Loading>
      </ReduxProvider>
    </AntdConfigProvider>
  );
}
