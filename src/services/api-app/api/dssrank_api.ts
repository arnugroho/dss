import {request} from "@umijs/max";

const route = 'dss_rank';
export async function getSawRank(params: API_TYPES.TableParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged/saw`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function getWpRank(params: API_TYPES.TableParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged/wp`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function getTopsisRank(params: API_TYPES.TableParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged/topsis`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function getPredictivePaged(params: API_TYPES.TableParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultList>(`${API_URL}/Predictive/paged`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}
