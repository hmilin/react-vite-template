import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import Inspect from 'vite-plugin-inspect';
import autoCSSModulePlugin from './plugins/autoCSSModule';
import removeDuplicateAntdCSS from './plugins/removeDuplicateAntdCSS';
import proxys from './proxys';

export default defineConfig(({ mode }) => {
  return {
    envDir: './config/environments/', // root的相对路径
    css: {
      modules: {
        generateScopedName: '[local]__[hash:base64:5]',
      },
    },
    resolve: {
      alias: [
        // css文件里使用~@指向src
        {
          find: /~@/,
          replacement: path.resolve(__dirname, '../src'),
        },
        // ~导入指向node_modules
        {
          find: /^~/,
          replacement: '',
        },
        // ts文件里使用@指向src
        {
          find: new RegExp('^@/(.*)$'),
          replacement: path.resolve(__dirname, '../src/$1'),
        },
        {
          find: 'rc-util/lib',
          replacement: 'rc-util/es',
        },
        {
          find: '@ant-design/icons',
          replacement: path.join(__dirname, '../node_modules/@ant-design/icons/dist/index.umd.js'),
        },
        {
          find: new RegExp(/^antd$/),
          replacement: path.join(__dirname, '../node_modules/antd/dist/antd.js'),
        },
        {
          find: 'lodash',
          replacement: 'lodash-es',
        },
      ],
    },
    plugins: [
      //  http://localhost:8000/__inspect/
      Inspect(),
      react({
        jsxRuntime: 'classic',
      }),
      autoCSSModulePlugin(),
      splitVendorChunkPlugin(),
      removeDuplicateAntdCSS(),
    ],
    server: {
      host: '0.0.0.0',
      port: 8000,
      proxy: proxys[mode],
    },
    preview: {
      host: '0.0.0.0',
      port: 8080,
      proxy: proxys.dev,
    },
    build: {
      cssCodeSplit: false,
      outDir: 'dist/react-vite-template',
      // sourcemap: true,
      // minify: false,
    },
    esbuild: {
      supported: { 'top-level-await': true },
      // logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./config/vitest.setup.ts'],
    },
  };
});
