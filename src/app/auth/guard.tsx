import { Navigate, Outlet } from 'react-router';

import { useIsAuthenticated } from '@/app/auth/lib/hooks/useIsAuthenticated';
import useAppLocation from '@/shared/hooks/useAppLocation';
import useAppSearchParams from '@/shared/hooks/useAppSearchParams';
import { getHref } from '@/shared/i18n/utils';

const UserGuard: React.FC<
   React.PropsWithChildren<{
      mode: 'online' | 'offline';
   }>
> = ({ children, mode }) => {
   const [{ from }] = useAppSearchParams();
   const { pathname, pathnameWithoutLocale } = useAppLocation();
   const isAuthenticated = useIsAuthenticated();

   if (pathnameWithoutLocale === '/not-found') {
      return <>{isAuthenticated ? children : <Outlet />}</>;
   }

   if (mode === 'online' && !isAuthenticated) {
      return (
         <Navigate
            to={{
               pathname: getHref('/auth/login'),
               search: `from=${pathname}`,
            }}
            replace
         />
      );
   }

   if (mode === 'offline' && isAuthenticated) {
      return <Navigate to={from || getHref('/home')} replace />;
   }

   return <>{children ?? <Outlet />}</>;
};

export default UserGuard;
