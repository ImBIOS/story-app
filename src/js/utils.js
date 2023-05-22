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
  const origin = window.location.origin;
  const url = new URL(path, origin);
  url.searchParams.set('lang', lang);

  if (origin.includes('github.io')) {
    return `/story-app${url.pathname}${isNoParam ? '' : url.search}`;
  }

  return `${url.pathname}${isNoParam ? '' : url.search}`;
};

/**
 * Format date
 * @param {string} dateStr
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
