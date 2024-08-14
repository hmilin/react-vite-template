import { App as AntdApp } from 'antd';
import { useEffect } from 'react';
import { useBlocker } from './useBlocker';

/**
 * react-router6将usePrompt移除了，这里抄过来并用自己的confirm组件
 *
 * @param  message
 * @param  when
 */
export function usePrompt(message: string, when = true) {
  const { modal } = AntdApp.useApp();

  const blocker = useBlocker(when);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      modal.confirm({
        title: '确定',
        content: message,
        onOk: () => blocker.proceed?.(),
      });
    }
  }, [blocker, message, modal]);
}
