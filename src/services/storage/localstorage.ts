import secureLocalStorage from 'react-secure-storage';

const TOKEN_KEY = 'tkn';
const LOGIN_HISTORY_KEY = 'uhkey';
export const MODUL_ACCOUNT = 'Account';
export const MODUL_PRODUCT = 'Product';
export const MODUL_CONTACT = 'Contact';
export const MODUL_USER = 'User';
export const MODUL_WAREHOUSE = 'Warehouse';
export const MODUL_BIN = 'Bin';
export const MODUL_EAV = 'Eav';
export const MODUL_ROW = 'Row';
export const MODUL_SHELF = 'Shelf';

export function saveToken(token?: string) {
  if (token) {
    secureLocalStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }
}

export function saveLoginHistory(user: API_TYPES.User) {
  user.lastLogin = new Date().toUTCString();
  user.image = `https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg`;
  //update history user login
  let loginHistory = secureLocalStorage.getItem(LOGIN_HISTORY_KEY) as API_TYPES.User[];
  let l: API_TYPES.User[] = [];
  if (loginHistory) {
    for (let lhistory of loginHistory) {
      if (lhistory.username !== user.username) {
        l.push(lhistory);
      }
    }
  }

  l.unshift({ ...user });

  secureLocalStorage.setItem(LOGIN_HISTORY_KEY, l.slice(0, 7));
}

export function removeLoginHistory(user: API_TYPES.User) {
  let loginHistory = secureLocalStorage.getItem(LOGIN_HISTORY_KEY) as API_TYPES.User[];
  let l: API_TYPES.User[] = [];
  for (let lhistory of loginHistory) {
    if (lhistory.username !== user.username && lhistory.lastLogin !== user.lastLogin) {
      l.push(lhistory);
    }
  }

  secureLocalStorage.setItem(LOGIN_HISTORY_KEY, l.slice(0, 7));
}

export function getLoginHistory() {
  return secureLocalStorage.getItem(LOGIN_HISTORY_KEY) as API_TYPES.User[];
}

export function getToken(): string {
  return JSON.parse(<string>secureLocalStorage.getItem(TOKEN_KEY));
}

export function clearStorage() {
  secureLocalStorage.removeItem(TOKEN_KEY);
}
