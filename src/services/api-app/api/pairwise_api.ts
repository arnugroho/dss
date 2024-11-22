import { request } from '@umijs/max';

const route = 'pairwise';

export async function getPairwise(params: API_TYPES.TableParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function updatePairwise(options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultResponse>(`${API_URL}/${route}`, {
    method: 'PUT',
    data: options,
    ...(options || {}),
  });
}

export async function getPairwiseByUuid(uuid: string) {
  return request<API_TYPES.DefaultResponse>(`${API_URL}/${route}/uuid/${uuid}`, {
    method: 'GET',
  });
}
