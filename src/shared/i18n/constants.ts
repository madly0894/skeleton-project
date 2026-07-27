import type { TLang } from '@/shared/types/models';

export const languageKey = 'locale';
export const defaultNS = 'translation';
export const fallbackLng = 'en';
export const languageCodes = ['en', 'az', 'ru', 'tr'];
export const languages: { key: TLang; label: string; abbr: string }[] = [
   { key: 'en', label: 'English', abbr: 'Eng' },
   { key: 'az', label: 'Azərbaycanca', abbr: 'Aze' },
   { key: 'ru', label: 'Русский', abbr: 'Rus' },
   { key: 'tr', label: 'Türkce', abbr: 'Tur' },
];
