declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
declare module '*.js?url' {
  const url: string;
  export default url;
}

declare module 'css-has-pseudo/browser';

// 将部分key设为optional
type Merge<T, U> = Pick<T & U, keyof (T & U)>;
type Optional<T, K = keyof T> = Merge<
  Pick<T, Exclude<keyof T, K>>,
  Partial<Pick<T, Extract<K, keyof T>>>
>;
