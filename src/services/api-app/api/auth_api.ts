/* eslint-disable @typescript-eslint/no-unused-vars */

import { request } from '@umijs/max';
import { clearStorage } from '@/services/storage/localstorage';

export async function login(body: API_TYPES.LoginParams, options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultResponse>(`${API_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// export async function getFakeCaptcha(
//   // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
//   params: API.getFakeCaptchaParams,
//   options?: { [key: string]: any },
// ) {
//   return request<API.FakeCaptcha>('/api/login/captcha', {
//     method: 'POST',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

export function outLogin(options?: { [key: string]: any }) {
  clearStorage();
  // return request<Record<string, any>>('/api/login/outLogin', {
  //   method: 'POST',
  //   ...(options || {}),
  // });
}

export async function currentUser(options?: { [key: string]: any }) {
  return request<API_TYPES.DefaultResponse>(`${API_URL}/api/auth/userinfo`, {
    method: 'GET',
    ...(options || {}),
  });
}
