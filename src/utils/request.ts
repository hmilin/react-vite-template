import { notification } from 'antd';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';
// 暂时先用2.0，减少改动
import type {
  BaseOptions,
  BasePaginatedOptions,
  BaseResult,
  CombineService,
  LoadMoreFormatReturn,
  LoadMoreOptions,
  LoadMoreOptionsWithFormat,
  LoadMoreParams,
  LoadMoreResult,
  OptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedOptionsWithFormat,
  PaginatedParams,
  PaginatedResult,
} from '@ahooksjs/use-request/lib/types';
import { useRequest as useRequestAhooks } from 'ahooks-v2';

export const codeMessage: Record<number, string> = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户信息已过期。',
  403: '没有权限，请联系管理员',
  404: '资源不存在',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const axiosBaseConfig: AxiosRequestConfig = {
  baseURL: '/',
  // params格式化规则
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  headers: {
    'Content-Type': 'application/json',
  },
};
const instance = axios.create(axiosBaseConfig);
const instanceSkipError = axios.create(axiosBaseConfig);

const tokenHandler = (req: AxiosRequestConfig) => {
  req.headers = {
    ...(req.headers ?? {}),
    token: (Cookies.get('token') || '') as string,
  } as any;
  return req;
};

instance.interceptors.request.use(tokenHandler);
instanceSkipError.interceptors.request.use(tokenHandler);

// 请求结果错误拦截
const errorHandler = (error: any) => {
  const { response } = error;

  // 错误处理
  if (!response) {
    notification.error({
      message: '您的网络发生异常，无法连接服务器',
    });
  } else {
    const message = codeMessage[response.status] || '服务错误，请联系管理员';
    notification.error({
      message,

      // 自定义业务错误提示
    });
  }
  return Promise.reject(error?.data);
};

// response拦截
instance.interceptors.response.use((response) => response.data, errorHandler);

instanceSkipError.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.data),
);

interface RequestOptions extends Omit<AxiosRequestConfig, 'url'> {
  /** 是否忽略全局错误处理 */
  skipErrorHandler?: boolean;
}
export function request<T = any>(
  url: string,
  options: RequestOptions = { method: 'get' },
): Promise<T> {
  const { skipErrorHandler, ...oth } = options;
  return skipErrorHandler
    ? instanceSkipError({
        url,
        ...oth,
      })
    : (instance({
        url,
        ...oth,
      }) as any);
}

type ResultWithData<T = any> = { data?: T; [key: string]: any };

export function useRequest<R = any, P extends any[] = any, U = any, UU extends U = any>(
  service: CombineService<R, P>,
  options: OptionsWithFormat<R, P, U, UU>,
): BaseResult<U, P>;
export function useRequest<R extends ResultWithData = any, P extends any[] = any>(
  service: CombineService<R, P>,
  options?: BaseOptions<R['data'], P>,
): BaseResult<R['data'], P>;
export function useRequest<R extends LoadMoreFormatReturn = any, RR = any>(
  service: CombineService<RR, LoadMoreParams<R>>,
  options: LoadMoreOptionsWithFormat<R, RR>,
): LoadMoreResult<R>;
export function useRequest<
  R extends ResultWithData<LoadMoreFormatReturn | any> = any,
  RR extends R = any,
>(
  service: CombineService<R, LoadMoreParams<R['data']>>,
  options: LoadMoreOptions<RR['data']>,
): LoadMoreResult<R['data']>;

export function useRequest<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: PaginatedOptionsWithFormat<R, Item, U>,
): PaginatedResult<Item>;
export function useRequest<Item = any, U extends Item = any>(
  service: CombineService<ResultWithData<PaginatedFormatReturn<Item>>, PaginatedParams>,
  options: BasePaginatedOptions<U>,
): PaginatedResult<Item>;
export function useRequest(api: any, options: any) {
  return useRequestAhooks(api, {
    formatResult: (response) => response.data,
    ...options,
  });
}
