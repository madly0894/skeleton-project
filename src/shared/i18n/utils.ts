import type { TLang } from '../types/models';

import history from '../common/history';

import { fallbackLng, languageCodes, languageKey, languages } from './constants';

export function getLanguageCode() {
   return localStorage.getItem(languageKey) || fallbackLng;
}

export function setLanguageCode(lng: string | false) {
   return localStorage.setItem(languageKey, lng || fallbackLng);
}

export function removeAllLeadingSlashes(path: string) {
   return path.replace(/^\/+/, '');
}

export function removeLanguageCode(path: string) {
   return path.replace(/^\/[a-z]{2}\//, '/');
}

function getPathPosition(path: string, subString = '/', index = 2) {
   return path.split(subString, index).join(subString).length;
}

export function setHref(
   lang: string = getLanguageCode(),
   path = history.location.pathname,
   subString?: string,
   index?: number,
) {
   const isFullUrl = path.startsWith('http');
   const url = isFullUrl ? new URL(path) : null;
   const pathname = url?.pathname ?? path;

   const currentLngWithoutFallbackLng = lang === fallbackLng ? '' : `/${lang}`;
   const pathnameWithoutFallbackLng = languageCodes.includes(pathname.split('/')[1])
      ? pathname.slice(getPathPosition(pathname, subString, index))
      : pathname;

   const origin = url?.origin ?? '';
   const search = history.location.search;

   return `${origin}${currentLngWithoutFallbackLng}${pathnameWithoutFallbackLng}${search}`;
}

export function getHref(path = '/') {
   const currentLng = getLanguageCode();
   const currentLngWithoutFallbackLng = currentLng === fallbackLng ? '' : `${currentLng}/`;
   const pathWithoutLeadingSlash = removeAllLeadingSlashes(path);
   const arrPath = pathWithoutLeadingSlash.split('/');

   return `/${languageCodes.includes(arrPath[0]) ? pathWithoutLeadingSlash : `${currentLngWithoutFallbackLng}${pathWithoutLeadingSlash}`}`;
}

export function findLanguage(key: TLang) {
   return languages.find(lang => lang.key === key)!;
}
