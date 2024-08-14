import react from '@vitejs/plugin-react';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import autoCSSModulePlugin from './plugins/autoCSSModule';
import removeDuplicateAntdCSS from './plugins/removeDuplicateAntdCSS';
import proxys from './proxys';

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
    ],
    server: {
      port: 8002,
      proxy: proxys[mode],
      sourcemap: true,
    },
    preview: {
      port: 8080,
      proxy: proxys[mode],
    },
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        plugins: process.env.OUTPUT_STATS
          ? [
              visualizer({
                emitFile: true,
                filename: 'stats.html',
              }),
            ]
          : null,
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lodash-es')) {
                return 'lodash';
              }
              if (id.includes('@formily')) {
                return 'formily';
              }
              if (id.includes('monaco-editor')) {
                return 'monaco-editor';
              }
              if (id.includes('react-router-dom') || id.includes('react-router')) {
                return '@react-router';
              }
              if (id.includes('echarts.js')) {
                return 'echarts';
              }
            }
          },
          chunkFileNames(info) {
            if (info.name !== 'index') {
              return '[name]-[hash].js';
            }
            // 使用目录名作为模块名
            const name = info.moduleIds.at(-1)?.match(/[^\/]+(?=\/index)/);
            return `${name}-[hash].js`;
          },
        },
      },
      target: 'modules',
    },
    esbuild: {
      supported: { 'top-level-await': true },

      // logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./config/vitest.setup.ts'],
      includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
      alias: [{ find: /^\@formily\/antd\-v5$/, replacement: '@formily/antd-v5/esm/index.js' }],
    },
  };
});
