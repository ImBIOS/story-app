/**
 * Get base path
 * @returns {string} Base path
 */
export const getBasePath = () => {
  const domain = window.location.origin;
  const path = window.location.pathname;
  const parts = path.split('/');

  if (domain.includes('github')) {
    return '/story-app';
  }

  // only use the first 2 parts
  return parts.slice(0, 2).join('/');
};
