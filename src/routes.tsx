import { lazy } from 'react';
import { Navigate, Outlet, Route, Routes as Switch } from 'react-router';

import UserGuard from '@/app/auth/guard';
import RootLayout from '@/app/layout';
import ROUTES from '@/shared/common/routes';
import { getHref } from '@/shared/i18n/utils';

const HomePage = lazy(() => import('@/pages/home/page'));

const Routes: React.FC = () => {
   return (
      <Switch>
         <Route path={ROUTES.LANG} element={<Outlet />}>
            <Route element={<UserGuard mode='offline' />}>
               <Route element={<RootLayout />}>
                  <Route index element={<Navigate to={getHref(ROUTES.HOME.to)} replace />} />
                  <Route path={ROUTES.HOME.path} element={<HomePage />} />
               </Route>
            </Route>
            <Route element={<UserGuard mode='offline' />}>
               <Route path={ROUTES.AUTH} element={<Outlet />}>
                  <Route index element={<Navigate to={getHref(ROUTES.LOGIN.to)} replace />} />
                  <Route path={ROUTES.LOGIN.path} element={<div>Login</div>} />
               </Route>
            </Route>
            <Route path={ROUTES.ERROR_404.path} element={<div>Error 404</div>} />
            <Route path={ROUTES.MAINTENANCE.path} element={<Navigate to={getHref(ROUTES.HOME.to)} replace />} />
            <Route path={ROUTES.NOT_FOUND} element={<Navigate to={getHref(ROUTES.ERROR_404.to)} replace />} />
         </Route>
      </Switch>
   );
};

export default Routes;
