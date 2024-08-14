import { request } from './request';

type ID = string | number;

export function createCRUD<T>(url = '') {
  const List = <P extends Record<string, any> | undefined>(params: P) =>
    request<T[]>(url, { method: 'GET', params });

  const PaginationList = <P extends Record<string, any> = {}>(params: PaginationParams<P>) =>
    request<ResponseBody.Pagination<T>>(url, { method: 'GET', params });

  const Add = (data: Partial<T>) => request<ResponseBody.Default<T>>(url, { method: 'POST', data });

  const Update = (id: ID, data: Partial<T>) =>
    request<ResponseBody.Default<T>>(`${url}${id ? `/${id}` : ''}`, {
      method: 'PUT',
      data,
    });

  const Patch = (id: ID, data: Partial<T>) =>
    request<ResponseBody.Default<T>>(`${url}${id ? `/${id}` : ''}`, { method: 'PATCH', data });

  const Delete = (id: ID) =>
    request<ResponseBody.Default<void>>(`${url}${id ? `/${id}` : ''}`, { method: 'DELETE' });

  const GetOne = (id: ID) =>
    request<ResponseBody.Default<T>>(`${url}${id ? `/${id}` : ''}`, { method: 'GET' });

  return {
    List,
    PaginationList,
    Add,
    Update,
    Patch,
    Delete,
    GetOne,
  };
}
