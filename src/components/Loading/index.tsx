import { Spin } from 'antd';
import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';

const Loading: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="text-center py-6">
          <Spin />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default Loading;
