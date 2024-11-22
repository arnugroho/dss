import { RequestOptionsType } from '@ant-design/pro-utils/es/typing';
import { request } from '@umijs/max';

const route = 'criteria';

export async function getCriteria(params: API_TYPES.TableParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function getCriteriaTree(
  params: API_TYPES.TableParams,
  options?: { [key: string]: any },
) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged/tree`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function getCriteriaAllTree(
  params: API_TYPES.TableParams,
  options?: { [key: string]: any },
) {
  let response = request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged/all/tree`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });

  const removeEmptyChildren = (data: any[]) => {
    return data.map((item) => {
      // Check if item has children and apply recursion if needed
      if (Array.isArray(item.children)) {
        item.children = removeEmptyChildren(item.children); // Recursively clean children
        // Remove `children` property if it’s an empty array after recursion
        if (item.children.length === 0) {
          item['isDisabled'] = false;
          delete item.children;
        } else {
          item['isDisabled'] = true;
        }
      }
      return item;
    });
  };

  response
    .then((result) => {
      if (result.status === 200) {
        removeEmptyChildren(result.data);
      }
      return true;
    })
    .catch(() => {
      return false;
    });

  return response;
}

export async function getCriteriaChild(
  params: API_TYPES.TableParams,
  options?: { [key: string]: any },
) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/paged/child`, {
    method: 'POST',
    data: { ...params, filter: { ...params, ...options } },
    ...(options || {}),
  });
}

export async function getCriteriaParent(
  params: API_TYPES.TableParams,
  options?: { [key: string]: any },
) {
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

export async function removeCriteriaAhpByUuid(uuid: string) {
  return request<Record<string, any>>(`${API_URL}/${route}/ahp/uuid/${uuid}`, {
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

export async function getSumWeight() {
  return request<RequestOptionsType>(`${API_URL}/${route}/sumweight`, {
    method: 'GET',
  });
}

export async function getSumWeightAll() {
  return request<RequestOptionsType>(`${API_URL}/${route}/sumweight/all`, {
    method: 'GET',
  });
}
