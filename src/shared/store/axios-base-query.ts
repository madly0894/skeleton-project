import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import $api from '../common/axios';

const axiosBaseQuery =
   ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<AxiosRequestConfig> =>
   async ({ url, data, params, method, headers, ...others }) => {
      try {
         const result = await $api({
            url: baseUrl + url,
            method,
            data,
            params,
            headers,
            ...others,
         });

         return {
            data: (result.data.response?.pagination ? result.data.response : result.data.response?.data) ?? null,
            meta: {
               config: result.config,
               headers: result.headers,
            },
         };
      } catch (err) {
         const error = err as AxiosError & {
            data?: unknown;
         };

         return {
            error: error.response?.data ?? error?.data ?? error,
            meta: {
               config: error.response?.config,
               headers: error.response?.headers,
            },
         };
      }
   };

export default axiosBaseQuery;
