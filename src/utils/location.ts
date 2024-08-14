import { map, omit } from 'lodash';

export function toSearch(query: Record<string, string>) {
  return query && '?' + map(query, (value, key) => `${key}=${value}`)?.join('&');
}

// 获取当前某个search参数的值
export function getSearchParam(key: string) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(key);
}

/** 删除某些search参数 */
export function omitSearch(...paths: string[]) {
  const searchParams = new URLSearchParams(location.search);
  const searchObj = Object.fromEntries([...searchParams]);
  return omit(searchObj, paths);
}
