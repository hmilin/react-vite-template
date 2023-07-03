import type { ThemeConfig } from 'antd/es/config-provider/context';

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    fontFamily: `-apple-system, BlinkMacSystemFont, '思源黑体', 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji'`,
    fontWeightStrong: 500,
    colorText: 'rgba(0, 0, 0, 0.65)',
    colorTextHeading: 'rgba(0, 0, 0, 0.88)',
    colorPrimary: '#613eea',
    colorInfo: '#613eea',
    colorInfoText: '#613eea',
    colorPrimaryText: '#613eea',
    colorSuccess: '#5cc42f',
    colorWarning: '#EBAE21',
    colorError: '#EB3850',
    colorHighlight: '#eb3850',
    colorBgBase: '#fff',
    colorBorder: '#d9d9d9',
    borderRadius: 2,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    fontSizeHeading1: 40,
    fontSizeHeading2: 32,
  },
  components: {
    Card: {
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    },
  },
};

export default theme;
