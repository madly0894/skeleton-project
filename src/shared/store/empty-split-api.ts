import BaseUtils from '../utils/base';

import axiosBaseQuery from './axios-base-query';
import createApi from './create-api';

export function providesList(
   resultsWithIds: Record<string, never>[] = [],
   tagType: string,
   key: string = 'id',
): unknown[] {
   return resultsWithIds
      ? [
           ...resultsWithIds.map(item => ({
              type: tagType,
              id: BaseUtils.getNestedValue(item, key),
           })),
           { type: tagType, id: 'LIST' },
        ]
      : [{ type: tagType, id: 'LIST' }];
}

// initialize an empty api service that we'll inject endpoints into later as needed
const emptySplitApi = createApi({
   baseQuery: axiosBaseQuery(),
   keepUnusedDataFor: 0,
   endpoints: () => ({}),
   refetchOnFocus: false,
   refetchOnReconnect: false,
   refetchOnMountOrArgChange: false,
});

export default emptySplitApi;
