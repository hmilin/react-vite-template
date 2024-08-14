import { useLatest } from 'ahooks';
import type { FormInstance as AntdForm } from 'antd';
import { useEffect } from 'react';

/** 在特定条件下重置表单 */
export default function useResetForm(form: AntdForm, when: any) {
  const formRef = useLatest<any>(form);
  useEffect(() => {
    if (Boolean(when)) {
      formRef.current?.reset?.('*');
      formRef.current?.resetFields?.();
    }
  }, [formRef, when]);

  return null;
}
