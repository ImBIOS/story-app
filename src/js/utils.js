import axios from 'axios';
import { USER_TOKEN_KEY } from './config';

/**
 * Format path to persist language parameter
 * @param {string} path Path
 * @param {boolean} isNoParam No parameter
 * @param {string} lang Language
 * @returns {string} Formatted path
 */
export const formatPath = (
  path,
  isNoParam = false,
  lang = new URLSearchParams(window.location.search).get('lang'),
) => {
  const { origin } = window.location;
  const url = new URL(path, origin);
  url.searchParams.set('lang', lang ?? 'id');

  if (origin.includes('github.io')) {
    return `/story-app${url.pathname}${isNoParam ? '' : url.search}`;
  }

  return `${url.pathname}${isNoParam ? '' : url.search}`;
};

/**
 * Format date
 * @param {string} dateStr Date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateStr) => {
  /** Get locale from url parameter */
  const locale = new URLSearchParams(window.location.search).get('lang') || 'id';
  return new Date(dateStr).toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Set user token from session storage
 * @param {string} key Key name of token
 * @param {string} value Value of token
 * @returns {void}
 */
export const setUserToken = (key, value) => sessionStorage.setItem(key, value);

/**
 * Get user token from session storage
 * @param {string} key Key name of token
 * @returns {string|null} User token
 */
export const getUserToken = (key) => sessionStorage.getItem(key);

/**
 * Destroy user token from session storage
 * @param {string} key Key name of token
 * @returns {void}
 */
export const destroyUserToken = (key) => sessionStorage.removeItem(key);

/**
 * Intercept axios response
 */
export const api = axios.create({ timeout: 10000 });
api.interceptors.response.use(
  (response) => response,
  (error) => error.response,
);

export const useIsGuest = () => {
  const token = getUserToken(USER_TOKEN_KEY);
  return token === 'guest';
};
