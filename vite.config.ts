import { builderDevTools } from '@builder.io/dev-tools/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import autoCSSModulePlugin from './config/plugins/autoCSSModule';
import removeDuplicateAntdCSS from './config/plugins/removeDuplicateAntdCSS';
import proxys from './config/proxys';

export default defineConfig(({ mode }) => {
  return {
    envDir: './config/environments/', // root的相对路径
    envPrefix: 'SYSTEM_', // 自定义环境变量只暴露SYSTEM_前缀的
    css: {
      modules: {
        generateScopedName: '[local]__[hash:base64:5]',
        localsConvention: 'camelCase', // className转为驼峰读取
      },
    },

    resolve: {
      alias: [
        // css文件里使用~@指向src
        {
          find: /~@/,
          replacement: path.resolve(__dirname, './src'),
        },
        // ~导入指向node_modules
        {
          find: /^~/,
          replacement: '',
        },
        // ts文件里使用@指向src
        {
          find: new RegExp('^@/(.*)$'),
          replacement: path.resolve(__dirname, './src/$1'),
        },
        {
          find: 'rc-util/lib',
          replacement: 'rc-util/es',
        },
        {
          find: 'lodash',
          replacement: 'lodash-es',
        },
      ],
    },
    plugins: [
      //  http://localhost:8002/__inspect/
      Inspect(),
      react(),
      autoCSSModulePlugin(),
      removeDuplicateAntdCSS(),
      builderDevTools({
        devToolsServerPort: 8888
      }),
    ],
    server: {
      port: 8888,
      proxy: proxys[mode],
      sourcemap: true,
    },
    preview: {
      port: 8080,
      proxy: proxys[mode],
    },
  };
});
