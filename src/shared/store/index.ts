import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { type PersistConfig, persistReducer, persistStore } from 'redux-persist';

import BaseUtils from '../utils/base';

import authMiddleware from './auth-middleware';
import emptySplitApi from './empty-split-api';
import rootReducer from './root-reducer';

const persistConfig: PersistConfig<RootState> = {
   key: 'root',
   whitelist: ['sidebar', 'dialog'],
   storage: {
      getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
      setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
      removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
   },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// creating unique store instances, which is particularly important for
// are needed for each request to prevent cross-request state pollution.
const store = configureStore({
   reducer: persistedReducer,
   // Adding the api middleware enables caching, invalidation, polling,
   // and other useful features of `rtk-query`.
   middleware: gDM =>
      gDM({ immutableCheck: false, serializableCheck: false }).concat(authMiddleware, emptySplitApi.middleware),
   devTools: BaseUtils.isDev(),
});
const persistor = persistStore(store);

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;
// Infer the return type of `makeStore`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;

export { persistor, store };
