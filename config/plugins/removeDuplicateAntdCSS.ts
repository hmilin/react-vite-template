import { Plugin, ResolvedConfig } from 'vite';

const proComponentsPathReg = /.*node_modules\/\@ant-design\/pro\-.*/;
const antdCssPathReg = /.*antd\/es\/.*\/style/;
const styleImportReg = /(import ["']antd\/es\/.*\/style["']\;?)\s*/g;

let config: ResolvedConfig;

/**
 * 删掉pro-components引入的antd样式，减少重复
 */
export default function removeDuplicateAntdCSS(): Plugin {
  return {
    name: 'rollup-plugin-delete-duplicate-antd-css',
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig;
    },
    load(id: string) {
      if (config.command === 'serve' && antdCssPathReg.test(id)) {
        return '';
      }
      return null;
    },
    transform(code: string, id: string) {
      let result = code;
      if (proComponentsPathReg.test(id) && code.match(styleImportReg)) {
        result = code.replace(styleImportReg, '');
      }
      return {
        code: result,
        map: null,
      };
    },
  };
}
