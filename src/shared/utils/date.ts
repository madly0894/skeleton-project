import type { ManipulateType, OpUnitType } from 'dayjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';

import dateLocale from '../i18n/date-locale';
import { getLanguageCode } from '../i18n/utils';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(relativeTime);

export default class DateUtils {
   static TIME_FORMAT = 'HH:mm';
   static DATE_FORMAT = 'DD.MM.YYYY';
   static DATETIME_FORMAT = `${this.DATE_FORMAT} / ${this.TIME_FORMAT}`;
   static DATE_LOCALIZED_FORMAT = 'MMMM DD, YYYY';
   static DATE_MINI_LOCALIZED_FORMAT = 'MMM DD, YYYY';
   static DATETIME_LOCALIZED_FORMAT = `${this.DATE_LOCALIZED_FORMAT} / ${this.TIME_FORMAT}`;
   static DATETIME_MINI_LOCALIZED_FORMAT = `${this.DATE_MINI_LOCALIZED_FORMAT} / ${this.TIME_FORMAT}`;
   static DATETIME_WEEK_FORMAT = `dddd / ${this.TIME_FORMAT}`;
   static ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
   static DEFAULT_TZ = 'Asia/Baku';

   static dayjsTz(...args: Parameters<typeof dayjs>) {
      return dayjs(...args).tz(this.DEFAULT_TZ);
   }

   static dayjsDateFormat(date?: dayjs.ConfigType) {
      return this.dayjsTz(date);
   }

   static splitDateFormat(
      date: dayjs.ConfigType,
      { value, unit = 'd' }: { value: number; unit?: ManipulateType },
      format = this.ISO_FORMAT,
   ) {
      return this.dayjsTz(date).add(value, unit).format(format);
   }

   static stringDateFormat(date: dayjs.ConfigType = dayjs(), format = this.DATETIME_FORMAT) {
      return this.dayjsTz(date).format(format);
   }

   static getDiffDay(endDate: dayjs.ConfigType, startDate: dayjs.ConfigType, unit: OpUnitType = 'day') {
      return this.dayjsTz(endDate).diff(startDate, unit);
   }

   static listDateFormat = (date: dayjs.ConfigType = dayjs(), format?: string) => {
      if (this.dayjsTz(date).isSame(dayjs(), 'day')) {
         return `${dateLocale[getLanguageCode()].today} / ${this.dayjsTz(date).format(this.TIME_FORMAT)}`;
      }
      if (this.dayjsTz(date).isSame(dayjs(), 'week')) {
         return this.dayjsTz(date).format(this.DATETIME_WEEK_FORMAT);
      }
      if (this.dayjsTz(date).isSame(dayjs().subtract(1, 'day'), 'day')) {
         return `${dateLocale[getLanguageCode()].yesterday} / ${this.dayjsTz(date).format(this.TIME_FORMAT)}`;
      }
      return this.dayjsTz(date).format(format ?? this.DATETIME_MINI_LOCALIZED_FORMAT);
   };

   static setLocale = (locale: string | ILocale) => {
      return dayjs.locale(locale);
   };

   static relativeTimeFormat = (date: dayjs.ConfigType = dayjs()) => {
      return this.dayjsTz(date).fromNow();
   };
}
