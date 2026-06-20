import { type NavigateOptions, useSearchParams } from 'react-router';
import queryString, { type ParsedQuery, type ParseOptions } from 'query-string';

export default function useAppSearchParams(
   defaultOptions?: ParseOptions,
): [ParsedQuery<unknown>, (key: string | string[], value: never, navigateOpts?: NavigateOptions) => void] {
   const [searchParams, setSearchParams] = useSearchParams();

   const parseParams = () => {
      return queryString.parse(searchParams.toString(), {
         parseBooleans: true,
         parseNumbers: true,
         arrayFormat: 'index',
         ...defaultOptions,
      });
   };

   const updateParams = (key: string | string[], value: never, options?: NavigateOptions) => {
      const currentParams = parseParams();

      delete currentParams.page;
      delete currentParams.page_size;

      const newParams: Record<string, unknown> = {
         ...currentParams,
         ...(Array.isArray(key)
            ? key.reduce(
                 (acc, k, i) => ({
                    ...acc,
                    [k]: value[i],
                 }),
                 {},
              )
            : {
                 [key]: value,
              }),
      };

      if (Object.values(newParams).some(val => val === '[]' || val === '{}')) {
         Object.keys(newParams).forEach(key => {
            delete newParams[key];
         });
      }

      const newQueryString = queryString.stringify(newParams, {
         skipNull: true,
         skipEmptyString: true,
         arrayFormat: 'index',
      });

      setSearchParams(newQueryString, options);
   };

   return [parseParams(), updateParams];
}
