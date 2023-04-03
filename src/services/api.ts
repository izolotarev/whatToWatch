import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { APIRoute } from '../const/const';
import { getToken } from './token';

const BACKEND_URL = 'https://what-to-watch-server-production.up.railway.app'; //'https://6.react.pages.academy/wtw' http://127.0.0.1:8000 https://what-to-watch-k1cx.onrender.com https://what-to-watch-server-production.up.railway.app
const REQUEST_TIMEOUT = 5000;

 enum HttpCode {
  Unauthorized = 401,
}

type UnauthorizedCallback = () => void;

export const createAPI = (onUnauthorized: UnauthorizedCallback): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const {response} = error;
      if (response?.status === HttpCode.Unauthorized) {
        if (error.config.url === APIRoute.LOGIN && error.config.method === 'post') {
          toast.info('Please provide correct email or password');
        }
        return onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
  );

  return api;
};
