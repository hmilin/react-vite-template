// 从umi迁移过来前期，先用这份胶水代码处理原umi的导出

import { createBrowserHistory } from 'history';
export {
  Link,
  matchRoutes,
  NavLink,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
export { request, useRequest } from './request';

// TODO 暂时先放这里 后面移到App
export const history = createBrowserHistory({ window });
