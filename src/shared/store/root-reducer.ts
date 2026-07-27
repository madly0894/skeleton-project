import { combineReducers } from '@reduxjs/toolkit';

// import authReducer from '@/auth/store/slice';
// import { uploadReducer } from '@/pages/my-drive/dialogs/upload/store/slice';
// import activityReducer from '@/pages/my-drive/store/slice';
// import dialogReducer from './slices/dialog/slice';
// import sidebarReducer from './slices/sidebar/slice';
import modalReducer from './slices/modal/slice';
import emptySplitApi from './empty-split-api';

const appReducers = combineReducers({
   // auth: authReducer,
   // sidebar: sidebarReducer,
   // dialog: dialogReducer,
   // activity: activityReducer,
   // upload: uploadReducer,
   modal: modalReducer,
   [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

export default appReducers;
