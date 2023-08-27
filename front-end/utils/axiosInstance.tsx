import axios, { AxiosRequestConfig } from 'axios';
import { getLocalStorageItem } from '@/utils/localStorage';

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  // Set the base URL for your API
  baseURL: 'http://10.13.1.7:3000/api/',
});

// Add an interceptor to include the JWT in the request headers
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => { // Use "any" type here
    const token = getLocalStorageItem('Token'); // Retrieve the JWT from storage
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;