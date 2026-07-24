import { type NavigateOptions, useNavigate } from 'react-router';

import { getHref } from '../i18n/utils';

import useAppLocation from './useAppLocation';

export default function useAppRouter() {
   const location = useAppLocation();
   const navigate = useNavigate();

   return {
      ...location,
      navigate: (
         to: string,
         {
            search = '',
            ...options
         }: Partial<
            NavigateOptions & {
               search: string;
            }
         > = {},
      ) => {
         const url = new URL(`${window.location.origin}/${to.replace(/^\//, '')}`);

         navigate(
            url.search
               ? getHref(to)
               : {
                    pathname: getHref(`${to}`),
                    search,
                 },
            options,
         );
      },
   };
}
