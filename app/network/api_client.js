import axios from 'axios';
import { ApiService } from './services';
import { PERPUSTAKAAN_API_URL } from '../constants';

const apiClient = axios.create({
  baseURL: PERPUSTAKAAN_API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    console.log('--- Request ---');
    console.log('Method:', config.method);
    console.log('URL:', config.url);
    console.log('Data:', config.data);

    try {
      const token = await ApiService.getToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      config.headers.Authorization = null;
    }
    return config;
  },
  (error) => {
    console.error('--- Request Error ---', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log('--- Response ---');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    return response;
  },
  (error) => {
    console.error('--- Response Error ---', error);
    return Promise.reject(error);
  }
);

export default apiClient;
