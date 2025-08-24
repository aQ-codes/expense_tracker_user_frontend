import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'token';
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

/**
 * Set JWT token in cookie
 * @param token - JWT token string
 */
export const setToken = (token: string): void => {
  Cookies.set(TOKEN_COOKIE_NAME, token, COOKIE_OPTIONS);
};

/**
 * Get JWT token from cookie
 * @returns JWT token string or undefined
 */
export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_COOKIE_NAME);
};

/**
 * Remove JWT token from cookie
 */
export const removeToken = (): void => {
  Cookies.remove(TOKEN_COOKIE_NAME);
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * Decode JWT token (without verification)
 * @param token - JWT token string
 * @returns decoded payload or null
 */
export const decodeToken = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};
