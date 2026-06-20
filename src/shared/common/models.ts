import type { TLang } from '../i18n/config';

import { EErrorCode, EType } from './enums';

// import icons from './icons';

export interface IBreadcrumb {
   id?: number;
   name: string;
   parent_id?: number;
   onClick?: (id: number) => void;
}

export interface IMeta {
   current_page: number;
   page_size: number;
   total_count: number;
   total_pages: number;
}

export interface IErrorResponse<T = unknown> {
   code: EErrorCode;
   message: string;
   data: T;
}

export interface IPagination<T, U = undefined> {
   data: U extends undefined ? T[] : U;
   pagination: IMeta | null;
   breadcrumbs?: IBreadcrumb[];
}

export interface ItemType {
   key?: string;
   icon?: React.ReactNode;
   label?: string;
   children?: ItemType[]; // Make `children` optional
   className?: string;
   type?: string;
   hidden?: boolean;
   badge?: number;
   role?: 'admin';
}

export type TOpenDialogType = {
   ids?: number[];
   type:
      | 'create'
      | 'update'
      | 'upload'
      | 'cancel'
      | 'delete'
      | 'rename'
      | 'refund'
      | 'extend'
      | 'publish'
      | 'withdraw'
      | 'tag'
      | 'sync'
      | 'grant'
      | 'share'
      | 'expire'
      | 'move'
      | 'archive'
      | 'preview'
      | 'view'
      | 'video-player'
      | 'view-pdf';
   isBreadcrumb?: boolean;
} | null;

export interface IResponse<T> {
   response: {
      data: T;
   };
}

export interface ILayoutProps {
   label?: React.ReactNode;
   isRequired?: boolean;
   error?: string;
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
   sort_order?: string;
   sort_by?: string;
}

export interface ICommon {
   id: number;
   name: string;
}

export interface IPointerEvent {
   x: number;
   y: number;
   index: number;
   key?: string;
}

export interface IParams {
   lang: TLang;
   item_type?: EType;
   [p: string]: string | undefined;
}

export interface IModalProps<T = unknown> {
   open: boolean;
   onClose: VoidFunction;
   data?: T;
}

export interface IAppleError {
   error: string;
}

export interface IClientInfo {
   app?: 'teams' | 'outlook' | 'slack' | 'telegram' | 'notion';
   browser: 'edge' | 'chrome' | 'safari' | 'firefox' | 'opera' | 'samsung' | 'uc' | 'unknown';
   device: 'mobile' | 'desktop';
   environment: 'in-app' | 'browser' | 'webview';
}

// export type TIcon = keyof ReturnType<typeof icons>;
