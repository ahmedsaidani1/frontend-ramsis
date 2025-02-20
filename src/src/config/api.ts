const getApiUrl = () => {
    if (import.meta.env.PROD) {
      return import.meta.env.VITE_PROD_API_URL;
    }
    return import.meta.env.VITE_API_URL;
  };
  
  export const API_URL = getApiUrl();
  
  // Add image URL configuration
  export const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
  };