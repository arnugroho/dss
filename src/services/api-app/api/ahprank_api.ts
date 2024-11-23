import {request} from "@umijs/max";

const route = 'ahp';
export async function getCalculateAhp(parentId: number) {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/calculate/${parentId}`, {
    method: 'GET',
  });
}

export async function getCalculateAhpAll() {
  return request<API_TYPES.DefaultList>(`${API_URL}/${route}/calculate/all`, {
    method: 'GET',
  });
}


