import { useLocation } from 'react-router';

import { removeLanguageCode } from '../i18n/utils';

export default function useAppLocation() {
   const location = useLocation();

   return {
      ...location,
      localePathname: location.pathname,
      pathname: removeLanguageCode(location.pathname),
   };
}
