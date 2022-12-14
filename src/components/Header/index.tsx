import avatarUrl from '@/assets/avatar.jpg';
import logoSrc from '@/assets/logo.svg';
import { HomeOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Popover } from 'antd';
import React from 'react';
import history from '@/utils/history';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooks';
import styles from './index.less';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch({
      type: 'user/signout',
    });
  };

  const toHome = () => {
    history.push('/');
  };

  const userMenu = (
    <Menu className="header-menu">
      <Menu.Item key="user_center">
        <Link to="/user/center">个人中心</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="signout">
        <a onClick={handleSignOut}>退出登录</a>
      </Menu.Item>
    </Menu>
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
      <Dropdown overlay={userMenu} placement="bottomRight">
        <div className={styles.avatar}>
          <Avatar src={avatarUrl} />
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;
