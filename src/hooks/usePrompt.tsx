import { Modal } from 'antd';
import type { Blocker } from 'history';
import { useCallback } from 'react';
import { useBlocker } from './useBlocker';

const { confirm } = Modal;

/**
 * react-router6将usePrompt移除了，这里抄过来并用自己的confirm组件
 *
 * @param  message
 * @param  when
 */
export function usePrompt(message: string, when = true) {
  const blocker = useCallback(
    (tx: Parameters<Blocker>[0]) => {
      // eslint-disable-next-line no-alert
      confirm({
        title: '确定',
        content: message,
        onOk: tx.retry,
      });
    },
    [message],
  );

  useBlocker(blocker, when);
}
