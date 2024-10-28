
import { RequestOptionsType } from '@ant-design/pro-utils/es/typing';
import {request} from "@umijs/max";

const route = 'alternative';
export async function getAlternative(params: API_TYPES.TableParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function getAlternativeParent(params: API_TYPES.TableParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged/parent`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function updateAlternative(options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultResponse>(`${API_URL}/${route}`, {
    method: 'PUT',
    data: options,
    ...(options || {}),
  });
}

export async function addAlternative(options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultResponse>(`${API_URL}/${route}`, {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

export async function removeAlternativeByUuid(uuid: string) {
  return request<Record<string, any>>(`${API_URL}/${route}/uuid/${uuid}`, {
    method: 'DELETE',
  });
}

export async function getAlternativeByUuid(uuid: string) {
  return request<API_TYPES.DefaultResponse>(`${API_URL}/${route}/uuid/${uuid}`, {
    method: 'GET',
  });
}

export async function getAlternativeSelect() {
  return request<RequestOptionsType>(`${API_URL}/${route}/select`, {
    method: 'GET',
  });
}
