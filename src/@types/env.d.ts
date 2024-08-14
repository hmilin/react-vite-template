declare module '*.less' {
  const classes: CSSModuleClasses;
  export default classes;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;

  VITE_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
