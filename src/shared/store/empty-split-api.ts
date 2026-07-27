import axiosBaseQuery from './axios-base-query';
import createApi from './create-api';

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
