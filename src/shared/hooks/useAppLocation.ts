import { useLocation } from 'react-router';

import { removeLanguageCode } from '../i18n/utils';

export default function useAppLocation() {
   const location = useLocation();

   return {
      ...location,
      pathnameWithoutLocale: removeLanguageCode(location.pathname),
   };
}
