import { createCRUD } from '@/utils/crud';
import { request, useRequest } from '@/utils/request';
import type { BasePaginatedOptions } from '@ahooksjs/use-request/lib/types';
import { useCallback, useRef } from 'react';

type ID = string | number;

export interface UseCRUDOptions extends Omit<BasePaginatedOptions<any>, 'paginated'> {
  defaultPageSize?: number;
  cacheKey?: string;
  /** 静态查询参数, 搭配refreshDeps实现依赖更新 */
  params?: Record<string, any>;
  skipErrorHandler?: boolean;
}

export default function useCRUD<T = any>(
  url: string | null,
  {
    defaultPageSize = 10,
    cacheKey,
    params = {},
    skipErrorHandler,
    ...othOptions
  }: UseCRUDOptions = {},
) {
  const { data, mutate, refresh, refreshAfterDelete, ...oth } = useRequest(
    ({ current, pageSize, sorter = {}, filters = {}, ...oth }) =>
      request<ResponseBody.Pagination<T>>(`${url}`, {
        params: { ...params, page: current, pageSize, ...sorter, ...filters, ...oth },
        skipErrorHandler,
      }),
    {
      cacheKey: cacheKey || url!,
      formatResult: (res) => ({ list: res.data, total: res?.total }),
      paginated: true,
      defaultPageSize,
      ready: url !== null,
      ...othOptions,
    },
  );

  const actions = useActions<T>(url!, refresh, refreshAfterDelete);

  return {
    ...oth,
    data,
    actions,
    refresh,
    refreshAfterDelete,
  };
}

/** the RUD actions */
export function useActions<T>(url = '', refresh: () => void, refreshAfterDelete: () => void) {
  const crud = useRef(createCRUD<T>(url));
  const actions = crud.current;

  const Add = useCallback(
    (body: Partial<T>) => {
      return actions.Add(body).then((res) => {
        refresh();
        return res;
      });
    },
    [actions, refresh],
  );

  const Update = useCallback(
    (id: ID, body: Partial<T>) => {
      return actions.Update(id, body).then((res) => {
        refresh();
        return res.data;
      });
    },
    [actions, refresh],
  );

  const Patch = useCallback(
    (id: ID, body: Partial<T>) => {
      return actions.Patch(id, body).then((res) => {
        refresh();
        return res.data;
      });
    },
    [actions, refresh],
  );

  const Delete = useCallback(
    (id: ID) => {
      return actions.Delete(id).then((res) => {
        refreshAfterDelete();
        return res;
      });
    },
    [actions, refreshAfterDelete],
  );

  return {
    Add,
    Update,
    Delete,
    Patch,
  };
}
