declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
declare module '*.js?url' {
  const url: string;
  export default url;
}

declare const FACTORY_URL: string;
declare const LOGIN_URL: string;
declare const FESUPPORT_URL: string;
declare const DOCS_URL: string;
declare const DATABASE_URL: string;
declare const APICOMPOSE_URL: string;
declare const LOWCODE_URL: string;
declare const COMPOSER_URL: string;
declare const SUB_DOMAIN: string;

// 将部分key设为optional
type Merge<T, U> = Pick<T & U, keyof (T & U)>;
type Optional<T, K = keyof T> = Merge<
  Pick<T, Exclude<keyof T, K>>,
  Partial<Pick<T, Extract<K, keyof T>>>
>;
