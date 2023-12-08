import axios, { AxiosRequestConfig } from 'axios';
import { getLocalStorageItem } from '@/utils/localStorage';

const axiosInstance = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/`,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => { 
    const token = getLocalStorageItem('Token');
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