import avatarUrl from '@/assets/avatar.jpg';
import logoSrc from '@/assets/logo.svg';
import history from '@/utils/history';
import { HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Popover } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooks';
import { useTranslation } from 'react-i18next';
import Avatar from '../Avatar';
import LanguageChanger from './LanguageChanger';
import styles from './index.css';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const dispatch = useAppDispatch();

  const handleSignOut = useCallback(() => {
    dispatch({
      type: 'user/signout',
    });
  }, [dispatch]);

  const toHome = () => {
    history.push('/');
  };

  const { t } = useTranslation();

  const userMenu = useMemo<MenuProps>(
    () => ({
      className: 'header-menu',
      items: [
        {
          key: 'user_center',
          label: <Link to="/user/center">{t('global.pageName.profile')}</Link>,
        },
        {
          key: 'signout',
          label: t('global.pageName.logout'),
          onClick: handleSignOut,
        },
      ],
    }),
    [handleSignOut, t],
  );

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logoSrc} alt="logo" />
      </div>
      <Popover placement="bottomRight">
        <div className="header-item" onClick={toHome}>
          <HomeOutlined />
        </div>
      </Popover>
      <div className="center" />
      <LanguageChanger />
      <Dropdown menu={userMenu} placement="bottomRight">
        <div className={styles.avatar}>
          <Avatar src={avatarUrl} />
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;
