export interface IMeta {
   current_page: number;
   page_size: number;
   total_count: number;
   total_pages: number;
}

export interface IErrorResponse<T = any> {
   message: string;
   data: T;
}

export interface IPagination<T, U = undefined> {
   data: U extends undefined ? T[] : U;
   pagination: IMeta | null;
}

export interface IResponse<T> {
   response: {
      data: T;
   };
}

export interface IOption<T = string> {
   value: T;
   label: React.ReactNode;
}

export interface IPaginationRequest {
   page?: number;
   page_size?: number;
}

export interface IQuery extends IPaginationRequest {
   q?: string;
}

export interface ICommon {
   id: number;
   name: string;
}

export interface IParams {
   lang: TLang;
   [p: string]: string | undefined;
}

export interface IModalProps<T extends object = object> {
   onClose?: VoidFunction;
   open?: boolean;
   data?: T;
}

export interface IClientInfo {
   app?: 'teams' | 'outlook' | 'slack' | 'telegram' | 'notion';
   browser: 'edge' | 'chrome' | 'safari' | 'firefox' | 'opera' | 'samsung' | 'uc' | 'unknown';
   device: 'mobile' | 'desktop';
   environment: 'in-app' | 'browser' | 'webview';
}

export type TLang = 'en' | 'az' | 'ru' | 'tr';
export type TTheme = 'light' | 'dark';
