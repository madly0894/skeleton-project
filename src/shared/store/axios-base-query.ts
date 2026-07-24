import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';

import $api from '../common/axios';

const axiosBaseQuery =
   ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<AxiosRequestConfig> =>
   async ({ url, data, params, method, headers, ...others }, api) => {
      try {
         const result = await $api({
            url: baseUrl + url,
            method,
            data,
            params,
            headers,
            ...others,
            signal: api.signal,
         });

         return {
            data: result.data.response?.pagination
               ? result.data.response
               : typeof result.data.response?.data !== 'undefined'
                 ? result.data.response.data
                 : result.data,
            meta: {
               config: result.config,
               headers: result.headers,
            },
         };
      } catch (err) {
         const error = err as AxiosError & {
            data?: unknown;
         };

         if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
            return { error: { status: 'CANCELLED' } };
         }

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
