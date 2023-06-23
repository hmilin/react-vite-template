import getFirstLetter from '@/utils/getFirstLetter';
import type { AvatarProps  as AvatarAntdProps } from 'antd';
import { Avatar as AvatarAntd } from 'antd';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import style from './index.css';

interface AvatarProps extends AvatarAntdProps {
  nickname?: string;
}

const Avatar: React.FC<AvatarProps> = ({ nickname, src, className, ...reset }) => {
  const { children } = useMemo(() => {
    if (src || !nickname) {
      return { children: null };
    }
    const letters = getFirstLetter(nickname);
    return {
      children: letters,
    };
  }, [nickname, src]);

  return (
    <AvatarAntd
      className={classNames(style.avatar, className)}
      src={src}
      {...reset}
      data-testid="avatar"
    >
      {children}
    </AvatarAntd>
  );
};

export default Avatar;
