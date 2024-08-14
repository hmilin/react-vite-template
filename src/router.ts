import { createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import { injectRouter } from './utils/history';

export const router = createBrowserRouter(routes);

injectRouter(router);
