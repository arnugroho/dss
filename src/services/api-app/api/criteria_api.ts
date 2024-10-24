
import { RequestOptionsType } from '@ant-design/pro-utils/es/typing';
import {request} from "@umijs/max";

const route = 'criteria';
export async function getCriteria(params: API_TYPES.TableParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function getCriteriaParent(params: API_TYPES.TableParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged/parent`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function updateCriteria(options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultResponse>(`${API_URL}/${route}`, {
    method: 'PUT',
    data: options,
    ...(options || {}),
  });
}

export async function addCriteria(options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultResponse>(`${API_URL}/${route}`, {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

export async function removeCriteriaByUuid(uuid: string) {
  return request<Record<string, any>>(`${API_URL}/${route}/uuid/${uuid}`, {
    method: 'DELETE',
  });
}

export async function getCriteriaByUuid(uuid: string) {
  return request<API_TYPES.DefaultResponse>(`${API_URL}/${route}/uuid/${uuid}`, {
    method: 'GET',
  });
}

export async function getCriteriaSelect() {
  return request<RequestOptionsType>(`${API_URL}/${route}/select`, {
    method: 'GET',
  });
}
