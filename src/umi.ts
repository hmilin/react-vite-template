// 从umi迁移过来前期，先用这份胶水代码处理原umi的导出
export {
  Link,
  matchRoutes,
  NavLink,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
export { default as history } from './utils/history';
export { request, useRequest } from './utils/request';
