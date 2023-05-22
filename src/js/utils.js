/**
 * Get base path
 * @returns {string} Base path
 */
export const getBasePath = () => {
  const path = window.location.pathname;
  const parts = path.split('/');
  // remove the last part (the file name)
  parts.pop();
  return parts.join('/');
};
