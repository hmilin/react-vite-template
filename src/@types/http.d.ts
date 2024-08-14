declare namespace ResponseBody {
  type Pagination<T> = {
    data: T[];
    page: number;
    pageSize: number;
    size: number;
    total: number;
  };

  type Default<T> = {
    total: any;
    code?: number;
    data: T;
    message: string;
    error?: string;
  };

  type PaginationBody<T> = Omit<Default<T>, 'data'> & Pagination<T>;
}

type PaginationParamsBase = {
  page?: number;
  pageSize?: number;
};
/** 分页接口的入参 */
type PaginationParams<T extends Record<string, any> = {}> = T extends never
  ? PaginationParamsBase
  : Omit<PaginationParamsBase, keyof T> & T;
