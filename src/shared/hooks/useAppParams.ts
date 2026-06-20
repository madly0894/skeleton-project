import { useParams } from 'react-router';

import type { IParams } from '../common/models';
import { fallbackLng } from '../i18n/config';

export default function useAppParams(): IParams {
   const { lang = fallbackLng, ...params } = useParams() as IParams;

   return { lang, ...params };
}
