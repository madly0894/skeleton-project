import { Navigate, Route, Routes } from 'react-router';

import ROUTES from '../shared/common/routes';
import { getHref } from '../shared/i18n/utils';

const isLoadingUserInfo = false;
const isErrorUserInfo = false;

const Auth: React.FC<React.PropsWithChildren> = ({ children }) => {
   return (
      <>
         {isLoadingUserInfo ? (
            <div className='center fixed inset-0'>Loading...</div>
         ) : isErrorUserInfo ? (
            <Routes>
               <Route path={ROUTES.LANG}>
                  <Route index element={<Navigate to={getHref(ROUTES.MAINTENANCE.to)} replace />} />
                  <Route path={ROUTES.MAINTENANCE.path} element={<div>Maintenance</div>} />
                  <Route path={ROUTES.NOT_FOUND} element={<Navigate to={getHref(ROUTES.MAINTENANCE.to)} replace />} />
               </Route>
            </Routes>
         ) : (
            children
         )}
      </>
   );
};

export default Auth;
