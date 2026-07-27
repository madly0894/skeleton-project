import { Navigate, Outlet } from 'react-router';

import { useIsAuthenticated } from '../auth/store/hooks/useIsAuthenticated';
import useAppLocation from '../shared/hooks/useAppLocation';
import useAppSearchParams from '../shared/hooks/useAppSearchParams';
import { getHref } from '../shared/i18n/utils';
import ROUTES from '../shared/common/routes';

const UserGuard: React.FC<
   React.PropsWithChildren<{
      mode: 'online' | 'offline';
   }>
> = ({ children, mode }) => {
   const [{ from }] = useAppSearchParams();
   const { localePathname } = useAppLocation();
   const isAuthenticated = useIsAuthenticated();

   if (mode === 'online' && !isAuthenticated) {
      return (
         <Navigate
            to={{
               pathname: getHref(ROUTES.LOGIN.to),
               search: `from=${localePathname}`,
            }}
            replace
         />
      );
   }

   if (mode === 'offline' && isAuthenticated) {
      return <Navigate to={from || getHref(ROUTES.HOME.to)} replace />;
   }

   return <>{children ?? <Outlet />}</>;
};

export default UserGuard;
