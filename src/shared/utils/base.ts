import { CURRENCIES } from '../common/constants';
// import icons from './icons';
import type { IClientInfo } from '../common/models';
import { setHref } from '../i18n/utils';

type InAppInfo = Required<Pick<IClientInfo, 'app' | 'browser'>>;

export default class BaseUtils {
   // ---- STATIC ICON MAPS
   static appIcons = {
      teams: 'teams.svg',
      outlook: 'outlook.svg',
      slack: 'slack.svg',
      telegram: 'telegram.svg',
      notion: 'notion.svg',
   };

   static browserIcons = {
      edge: 'edge.svg',
      chrome: 'chrome.svg',
      safari: 'safari.svg',
      firefox: 'firefox.svg',
      unknown: 'browser.svg',
   };

   static deviceIcons = {
      mobile: 'mobile.svg',
      desktop: 'desktop.svg',
   };

   static IN_APP_RULES: Array<[RegExp, InAppInfo]> = [
      [/microsoftteams|teamsmobile/i, { app: 'teams', browser: 'edge' }],
      [/outlook/i, { app: 'outlook', browser: 'edge' }],
      [/slack/i, { app: 'slack', browser: 'chrome' }],
      [/telegram/i, { app: 'telegram', browser: 'unknown' }],
      [/notion/i, { app: 'notion', browser: 'chrome' }],
   ];

   static BROWSER_RULES: Array<[RegExp, IClientInfo['browser']]> = [
      [/edg\//i, 'edge'],
      [/opr\//i, 'opera'],
      [/samsungbrowser/i, 'samsung'],
      [/ucbrowser/i, 'uc'],
      [/firefox\//i, 'firefox'],
      [/chrome\//i, 'chrome'],
      [/safari\//i, 'safari'],
      // человекочитаемые строки
      [/google chrome/i, 'chrome'],
      [/microsoft edge/i, 'edge'],
      [/mozilla firefox/i, 'firefox'],
      [/safari/i, 'safari'],
   ];

   static isDevMode(): boolean {
      return window.location.hostname === 'filemg-dev.bestcomp.net';
   }

   static isDev() {
      return import.meta.env.MODE === 'development';
   }

   static isProd() {
      return import.meta.env.MODE === 'production';
   }

   static getIsBundleError(message?: string) {
      return !!message?.includes('Failed to fetch dynamically imported module:');
   }

   static replaceProdUrlToLocalUrl(url: string) {
      return setHref(undefined, this.isDev() ? url.replace('filemg-dev.bestcomp.net', 'localhost:9405') : url).replace(
         /\?.*$/,
         '',
      );
   }

   static isSafariOrFirefox(): boolean {
      const ua = navigator.userAgent;
      const isFirefox = /firefox/i.test(ua);
      const isSafari = /safari/i.test(ua) && !/chrome|chromium|crios|edg|opr|android/i.test(ua);
      return isSafari || isFirefox;
   }

   static getExtension(filename: string = '') {
      const fileName = filename.split('.');
      return fileName[fileName.length - 1].toLowerCase();
   }

   static removeExtension(filename: string) {
      const ext = this.getExtension(filename);
      return ext ? filename.replace(/\.[^.]+$/, '') : filename;
   }

   static downloadFile(url: string, filename?: string) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename ?? ''; // Suggested filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   }

   static saveBlob(blob: Blob, filename: string) {
      const url = URL.createObjectURL(blob);
      this.downloadFile(url, filename);
      this.debounce(() => {
         URL.revokeObjectURL(url); // Free memory
      }, 1000)();
   }

   static getFileName(filename: string) {
      return filename.split('filename=')[1]?.replace(/"/g, '');
   }

   static firstLetterUppercase(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
   }

   static debounce<T extends (...args: never[]) => void>(
      callback: T,
      delay = 0,
   ): ((...args: Parameters<T>) => void) & { cancel(): void } {
      let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

      const debounced = ((...args: Parameters<T>) => {
         clearTimeout(timeoutId);
         timeoutId = setTimeout(() => callback(...args), delay);
      }) as ((...args: Parameters<T>) => void) & { cancel(): void };

      debounced.cancel = () => {
         clearTimeout(timeoutId);
         timeoutId = undefined;
      };

      return debounced;
   }

   static goToEl(id: string, isEnd = false) {
      const el = document.getElementById(id);
      if (el) {
         el.scrollTo({ top: isEnd ? el.scrollHeight : 0, behavior: 'smooth' });
      }
   }

   // static getIconByContentType({ fileName, contentType }: { fileName: string; contentType?: string }) {
   //     let icon = '';
   //
   //     if (!!contentType && !!CONTENT_TYPES[contentType]) {
   //         const exts: string[] | undefined = CONTENT_TYPES[contentType];
   //
   //         exts.forEach(item => {
   //             if (this.getExtension(fileName.toLowerCase()) === item) {
   //                 icon = item;
   //             } else {
   //                 icon = this.getExtension(fileName);
   //             }
   //         });
   //     } else {
   //         icon = this.getExtension(fileName);
   //     }
   //
   //     return icons({
   //         size: 24,
   //         color: 'currentColor',
   //     })[icon as TIcon];
   // }

   static openURL(url: string) {
      return window.open(url, '_blank', 'noopener,noreferrer');
   }

   static formatBytes(bytes: number = 0): string {
      if (!Number.isFinite(bytes) || bytes <= 0) {
         return '0 B';
      }
      const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
      const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
      const val = bytes / Math.pow(1024, i);
      const digits = val >= 100 ? 0 : val >= 10 ? 1 : 2;
      return `${parseFloat(val.toFixed(digits))} ${units[i]}`;
   }

   static roundNumber(number: number, currency?: string) {
      const s = String(number);
      return `${currency ? CURRENCIES[currency] : ''}${s.slice(0, -2) + '.' + s.slice(-2)}`;
   }

   static mbToBytes(mb: number) {
      return mb * 1024 * 1024;
   }

   static bytesToMB(bytes: number): number {
      if (!Number.isFinite(bytes) || bytes <= 0) {
         return 0;
      }
      return bytes / (1024 * 1024);
   }

   static sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

   static getNestedValue(obj: Record<string, never>, path: string) {
      return path.split('.').reduce((acc, key) => acc[key], obj);
   }

   static trim(value: string): string {
      return value.replace(/^\s+/, '');
   }

   static devLog(...args: never[]) {
      if (this.isDevMode() || this.isDev()) {
         console.log(...args);
      }
   }

   static detectClient(userAgent?: string): IClientInfo {
      const ua = (userAgent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '')).toLowerCase();

      // touchPoints только если UA не передан явно (клиентский случай)
      const touchPoints = userAgent ? 0 : typeof navigator !== 'undefined' ? navigator.maxTouchPoints : 0;
      const isIpad = /ipad/.test(ua) || (/macintosh/.test(ua) && touchPoints > 1);
      const device: IClientInfo['device'] = /mobile|iphone|android/.test(ua) || isIpad ? 'mobile' : 'desktop';

      const isAndroidWebView =
         /android/.test(ua) && (/wv\)/.test(ua) || (/version\/\d/.test(ua) && /chrome\//.test(ua)));
      const isIosWebView = /iphone|ipad/.test(ua) && !/safari\//.test(ua);
      const isWebView = isAndroidWebView || isIosWebView;

      const inApp = this.IN_APP_RULES.find(([re]) => re.test(ua))?.[1];
      const browser = this.BROWSER_RULES.find(([re]) => re.test(ua))?.[1] ?? 'unknown';

      if (inApp) {
         return { ...inApp, device, environment: 'in-app' };
      }

      if (isWebView) {
         return { browser, device, environment: 'webview' };
      }

      return { browser, device, environment: 'browser' };
   }

   static detectPlatform() {
      if (typeof navigator === 'undefined') {
         return 'unknown';
      }
      const ua = navigator.userAgent;
      if (/iPhone|iPad|iPod/.test(ua)) {
         return 'ios';
      }
      if (/Android/.test(ua)) {
         return 'android';
      }
      return 'unknown';
   }

   // static searchText(text: string, searchText: string) {
   //    return text.toLowerCase().includes(searchText.toLowerCase());
   // }

   // static isJson(str: string) {
   //    try {
   //       JSON.parse(str);
   //    } catch {
   //       return false;
   //    }
   //    return true;
   // }
}
