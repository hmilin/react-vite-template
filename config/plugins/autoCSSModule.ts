import type { Plugin } from 'vite';

/**
 * vite默认只对.module${cssLangs}使用CSSModule
 * 这里给所有`import style from './style${cssLangs}'`手动添加.module后缀
 * 类似这种`import otherStyles from './bar.css?inline'`将按vite默认处理逻辑
 */
export default function autoCSSModulePlugin(): Plugin {
  return {
    name: 'auto-css-module',
    transform(code: string) {
      let result = code;
      /**
       * match the imported style file, for example:
       * import style from './style.less';
       */
      const REG_EXP = /(import [a-z]+ from ["'].+\.[css|less|sass|scss|styl|stylus]+)(["'])/;

      if (code.match(REG_EXP)) {
        // The judgment standard of cssModule in vite uses regular matching, add "?module.css" after the path to match successfully, and then cssModule of vite can be used.
        // @ts-ignore
        result = code.replace(REG_EXP, ($1, $2, $3) => {
          /**
           * add cssModule flag to match cssModuleRE.
           * see vite project file as "vite/src/node/plugins/css.ts".
           *
           * const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`;
           * const cssModuleRE = new RegExp(`\\.module${cssLangs}`);
           * const isModule = modulesOptions !== false && cssModuleRE.test(id);
           */
          return `${$2}?.module.css${$3}`;
        });
      }

      return {
        code: result,
        map: null,
      };
    },
  };
}
