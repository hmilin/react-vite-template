import Header from '@/components/Header';
import { useAppDispatch } from '@/store/hooks';
import { queryCurrentUser } from '@/store/slices/user';
import { useMount } from 'ahooks';
import React from 'react';
import { Outlet } from 'react-router';
import styles from './index.less';

interface LayoutProps {
  auth?: boolean;
}

const Layout: React.FC<LayoutProps> = () => {
  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(queryCurrentUser());
  });

  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
