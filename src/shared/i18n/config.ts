import { initReactI18next } from 'react-i18next';
import { AxiosError } from 'axios';
import i18n, { type LanguageDetectorModule } from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend, { type HttpBackendOptions, type RequestCallback } from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';

import $api from '../common/axios';
import history from '../common/history';
import DateUtils from '../utils/date.utils';

import dateLocale from './date-locale';
import { getLanguageCode, removeAllLeadingSlashes, setLanguageCode } from './utils';
import { fallbackLng, languageCodes, defaultNS } from './constants';

const path = removeAllLeadingSlashes(history.location.pathname);
const arrPath = path.split('/');
const currentLang = languageCodes.includes(arrPath[0]) && arrPath[0];
const pathWithoutLang = arrPath[0].length <= 2 && arrPath.slice(1).join('/');
const currentLangWithoutFallbackLng = (!!currentLang && (currentLang === fallbackLng ? '' : `/${currentLang}`)) || '';

const LanguageDetector: LanguageDetectorModule = {
   type: 'languageDetector',
   init: () => setLanguageCode(currentLang),
   detect: () => getLanguageCode(),
   cacheUserLanguage: () =>
      queueMicrotask(() => {
         const currentLng = currentLang || fallbackLng;
         history.replace(`${currentLangWithoutFallbackLng}/${pathWithoutLang || path}${history.location.search}`);
         document.documentElement.setAttribute('lang', currentLng);
         $api.defaults.headers.common['Accept-Language'] = currentLng;
         DateUtils.setLocale(dateLocale[currentLng]);
      }),
};

// the translations
// (tip move them in a JSON file and import them)
i18n
   .use(ChainedBackend)
   .use(LanguageDetector)
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      // debug: Utils.isDev(),
      debug: false,
      defaultNS,
      // ns: defaultNS,
      // keySeparator: false,
      fallbackLng: false,
      supportedLngs: languageCodes,
      backend: {
         backends: [
            HttpBackend, // if a namespace can't be loaded via normal http-backend loadPath, then the inMemoryLocalBackend will try to return the correct resources
            resourcesToBackend({
               en: {
                  translation: {
                     maintenance_title: 'Maintenance',
                     maintenance_text: 'Sorry! We are under maintenance currently!',
                     something_went_wrong: 'Something went wrong',
                  },
               },
            }),
         ],
         backendOptions: [
            {
               // addPath: `${import.meta.env.VITE_API_URL}/locales/add/{{lng}}/{{ns}}`,
               // loadPath: `${import.meta.env.VITE_API_URL}/locales/{{lng}}/{{ns}}`,
               loadPath: `${import.meta.env.VITE_API_URL}/locales/{{lng}}`,
               request: async (_: HttpBackendOptions, url: string, __: string | object, callback: RequestCallback) => {
                  try {
                     const { data, status } = await $api.get(url);
                     callback(null, { data: data.response.data[defaultNS], status });
                  } catch (err) {
                     const error = err as AxiosError;
                     callback(error, {
                        data: { message: error.message },
                        status: error.status ?? 500,
                     });
                  }
               },
            },
         ],
      },
      interpolation: {
         // escapeValue: false, // react already safes from xss
         formatSeparator: '.',
      },
      load: 'languageOnly',
      initAsync: false,
      react: {
         useSuspense: true,
      },
   });

export default i18n;
