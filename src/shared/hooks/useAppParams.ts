import { useParams } from 'react-router';

import type { IParams } from '../types/models';

import { fallbackLng } from '../i18n/constants';

export default function useAppParams(): IParams {
   const { lang = fallbackLng, ...params } = useParams() as IParams;

   return { lang, ...params };
}
