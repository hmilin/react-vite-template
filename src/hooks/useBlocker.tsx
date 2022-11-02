import { useLatest } from 'ahooks';
import type { Blocker } from 'history';
import { debounce } from 'lodash';
import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

/**
 * react-router6将useBlocker移除了，这里抄过来
 *
 * @param  blocker
 * @param  when
 */
export function useBlocker(blocker: Blocker, when = true): void {
  const { navigator } = useContext(NavigationContext);
  const whenRef = useLatest(when);

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block(
      // 确保拿到最新的when值（或许应该放在hook外部解决...）
      debounce((tx) => {
        if (!whenRef.current) {
          unblock();
          tx.retry();
          return;
        }
        const autoUnblockingTx = {
          ...tx,
          retry() {
            // Automatically unblock the transition so it can play all the way
            // through before retrying it. TODO: Figure out how to re-enable
            // this block if the transition is cancelled for some reason.
            unblock();
            tx.retry();
          },
        };

        blocker(autoUnblockingTx);
      }, 0),
    );

    return unblock;
  }, [navigator, blocker, when, whenRef]);
}
