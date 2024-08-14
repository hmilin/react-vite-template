import type { CookieAttributes } from 'js-cookie';
import Cookies from 'js-cookie';

export function setCookies(name: string, value: string, options: CookieAttributes = {}) {
  Cookies.set(name, value, {
    sameSite: 'Strict',
    ...options,
  });
}

export function removeCookies(name: string, options: CookieAttributes = {}) {
  Cookies.remove(name, {
    sameSite: 'Strict',
    ...options,
  });
}
