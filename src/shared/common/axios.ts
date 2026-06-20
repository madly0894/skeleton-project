import type { InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';
import queryString from 'query-string';
import { toast } from 'sonner';

import StorageUtils from '../utils/storage';

// import { getToken } from '@/shared/lib/utils/base';

const baseURL = import.meta.env.VITE_API_URL;

const $api = axios.create({
   baseURL,
   // withCredentials: true,
});

/* ------------------------------------------------------------------ */
/* Request interceptor */
/* ------------------------------------------------------------------ */

$api.interceptors.request.use(async config => {
   config.paramsSerializer = {
      serialize: params =>
         queryString.stringify(params, {
            skipNull: true,
            skipEmptyString: true,
            arrayFormat: 'index',
         }),
   };

   if (StorageUtils.getToken()) {
      config.headers.Authorization = `Bearer ${StorageUtils.getToken()}`;
   }

   return config;
});

/* ------------------------------------------------------------------ */
/* Response interceptor */
/* ------------------------------------------------------------------ */

$api.interceptors.response.use(
   response => {
      if (response.data?.message) {
         toast.success(response.data.message);
      }

      return response;
   },
   async (
      err: AxiosError<Error> & {
         config: InternalAxiosRequestConfig & {
            _retry?: boolean;
         };
      },
   ) => {
      toast.error(err.response?.data?.message || err.message || 'Something went wrong, please try again.');

      return Promise.reject(err);
   },
);

export default $api;
