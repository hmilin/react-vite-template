import type { To, createBrowserRouter } from 'react-router-dom';

type Router = ReturnType<typeof createBrowserRouter>;

type History = {
  push: Router['navigate'];
  go: Router['navigate'];
  back: () => ReturnType<Router['navigate']>;
  listen: Router['subscribe'];
  replace: (to: To) => Promise<void>;
};

let router: Router;
// 兼容旧的history API
export const history = new Proxy<History>({} as History, {
  get(target, p: keyof History, receiver) {
    if (!target[p]) {
      return () => {
        console.warn('Router instance is not initialized');
      };
    }
    return target[p];
  },
  set(target, p: keyof History, newValue, receiver) {
    target[p] = newValue;
    return true;
  },
});
const initHistory = () => {
  history.push = router.navigate;
  history.go = router.navigate;
  history.back = () => router.navigate(-1);
  history.listen = router.subscribe;
  history.replace = (to: To) => router.navigate(to, { replace: true });
};

export function injectRouter(newRouter: Router) {
  router = newRouter;
  initHistory();
}

export default history;
