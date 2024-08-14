import theme from '@/styles/theme';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import type { Locale } from 'antd/es/locale';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

const localeMaps: Record<string, Locale> = {
  'en-US': enUS,
  'zh-CN': zhCN,
};

const AntdProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation();
  const locale = localeMaps[i18n.language as string] || zhCN;

  return (
    <AntdConfigProvider
      locale={locale}
      theme={theme}
      input={{ allowClear: true }}
      textArea={{ allowClear: true }}
    >
      {children}
    </AntdConfigProvider>
  );
};

export default AntdProvider;
