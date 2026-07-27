import { isFulfilled, type Middleware } from '@reduxjs/toolkit';

import ROUTES from '@/shared/common/routes';

import history from '../common/history';
import { getHref } from '../i18n/utils';
import StorageUtils from '../utils/storage.utils';

import emptySplitApi from './empty-split-api';

/**
 * Перехватывает отклонённый refresh и успешные logout/смена пароля/завершение сессии
 * и выполняет полный выход: очищает стор, storage и редиректит на логин.
 */
const authMiddleware: Middleware = storeAPI => next => action => {
   // url может быть в двух местах: в meta (RTK Query) или в payload (axios error)
   if (
      (isFulfilled(action) && (action as any).meta?.arg?.endpointName === 'logout') ||
      (action as any).payload?.status === 401
   ) {
      storeAPI.dispatch(emptySplitApi.internalActions.resetApiState());
      StorageUtils.removeToken();
      history.replace(getHref(ROUTES.LOGIN.to));
   }

   return next(action);
};

export default authMiddleware;
