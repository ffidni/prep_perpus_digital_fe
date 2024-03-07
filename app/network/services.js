import axios from 'axios';
import apiClient from './api_client';

const handleError = (error) => {
  let result;
  if (error.response) {
    const { status, message, data } = error.response;
    console.error('Response error:', status, message, data);
    result = message || data?.message || 'Server error';
  }
  return Promise.reject(result ?? error.toString());
};

export class ApiService {
  static getToken = async () => {
    try {
      const response = await axios.get('/api/get-token');
      return response.data.token;
    } catch (error) {
      handleError(error);
    }
  };

  static setToken = async (data) => {
    try {
      await axios.post('/api/set-token', data);
      return true;
    } catch (error) {
      handleError(error);
    }
  };

  static login = async (values) => {
    try {
      const response = await apiClient.post(`v1/login`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { refresh_expires_in, token_expires_in, token } =
        response.data.data;
      if (refresh_expires_in && token_expires_in && token) {
        try {
          await axios.post('/api/set-token', {
            tokenExpires: token_expires_in,
            refreshExpires: refresh_expires_in,
            token: token,
          });
        } catch (error) {
          return handleError(error);
        }
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  static register = async (values) => {
    try {
      const response = await apiClient.post(`v1/register`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  static addItem = async ({ table, values }) => {
    try {
      const response = await apiClient.post(`v1/${table}`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  static getItem = async ({ table, id, params }) => {
    let endpoint = `v1/${table}`;
    if (id) {
      endpoint = `${endpoint}/${id}`;
    }
    try {
      const response = await apiClient.get(endpoint, {
        params,
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  static updateItem = async ({ table, id }) => {
    try {
      const response = await apiClient.put(`v1/${table}/${id}`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  static deleteItem = async ({ table, id }) => {
    try {
      const response = await apiClient.delete(`v1/${table}/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };
}
