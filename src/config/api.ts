const getApiUrl = () => {
    if (import.meta.env.PROD) {
      return import.meta.env.VITE_PROD_API_URL;
    }
    return import.meta.env.VITE_API_URL;
  };
  
  export const API_URL = getApiUrl();
  
  export const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    // Remove /api from the API_URL when constructing image URLs
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  };
  
  export const normalizeImageUrl = (url: string) => {
    if (!url) return '';
    // If it's already a full URL, return it
    if (url.startsWith('http')) return url;
    // Remove /api from the API_URL when constructing image URLs
    const baseUrl = API_URL.replace('/api', '');
    // If it's a relative URL starting with /uploads, make it absolute
    if (url.startsWith('/uploads')) return `${baseUrl}${url}`;
    // If it's just the filename, add the full path
    return `${baseUrl}/uploads/${url}`;
  };