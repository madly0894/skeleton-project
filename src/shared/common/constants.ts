import type { SetValueConfig } from 'react-hook-form';

import type { IOption } from '../types/models';

import { EAuthType, EByte, EErrorCode, EPeriod, EPermission, EStatus } from '../types/enums';

export const DIGIT_EXP = /^-?\d*(\.\d*)?$/;
export const NUMBER_EXP = /\D/g;
export const HOME_NUMBER_CODE_EXP = /\+994 \((12|18|20|21|22|23|24|25|26|36)\)/;
export const HOME_NUMBER_FORMAT_EXP = new RegExp(`(${HOME_NUMBER_CODE_EXP.source}) \\d{3}-\\d{2}-\\d{2}`);
export const PHONE_NUMBER_CODE_EXP = /\+994 \((10|99|5[015]|60|7[07])\)/;
export const PHONE_NUMBER_MASK = '+994 (__) ___-__-__';
export const PHONE_NUMBER_FORMAT_EXP = new RegExp(`(${PHONE_NUMBER_CODE_EXP.source}) \\d{3}-\\d{2}-\\d{2}`);
// Taken from HTML spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
export const EMAIL_EXP =
   // eslint-disable-next-line
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9]{2,}(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
export const URL_EXP =
   // eslint-disable-next-line
    /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

export const ERROR_INFORMATION: Record<EErrorCode, string> = {
   [EErrorCode.AccountDeletionPending]: 'Account deletion pending',
   [EErrorCode.EmailNotConfirmed]: 'Email not confirmed',
};

export const HTTP_METHODS = {
   GET: 'get',
   POST: 'post',
   PUT: 'put',
   DELETE: 'delete',
   PATCH: 'patch',
};

export const ASC_ASCENDING = 'ASC';
export const DESC_ASCENDING = 'DESC';

export const DEFAULT_PAGINATION_PARAMS = {
   page: 1,
   pageSize: 15,
};

export const INITIAL_POSITION = {
   x: 0,
   y: 0,
   index: -1,
};

export const AUTO_CLOSE = 3000;

export const FORM_OPTIONS: SetValueConfig = {
   shouldDirty: true,
   shouldTouch: true,
   shouldValidate: true,
};

export const CURRENCIES: Record<string, string> = {
   AZN: '₼',
   USD: '$',
   EUR: '€',
   // TRY: '₺',
   // RUB: '₽',
};

export const TITLES: Record<string, string> = {
   file: 'files',
   folder: 'folders',
   favorite: 'favorites',
   deleted: 'deleted',
   trash: 'trash',
   active: 'active',
   myshared: 'my_shared',
   shared: 'shared_with_me',
   mysharedlinks: 'my_shared_links',
   album: 'albums',
   photo: 'albums',
};

export const INPUT_TYPES =
   'input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=reset]):not([type=range]):not([type=color]),textarea,select,[contenteditable="true"]';

export const CONTENT_TYPES: Record<string, string[]> = {
   'application/x-7z-compressed': ['7z'],
   'video/x-msvideo': ['avi'],
   'text/csv': ['csv'],
   'application/msword': ['doc'],
   'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
   'image/gif': ['gif'],
   'image/jpeg': ['jpeg', 'jpg'],
   'image/png': ['png'],
   'video/mp4': ['mp4', 'mov', 'm4v'],
   'video/x-matroska': ['mkv'],
   'audio/mpeg': ['mp3', 'wav'],
   'audio/ogg': ['ogg'],
   'application/pdf': ['pdf'],
   'text/plain': ['txt'],
   'text/html': ['html'],
   'application/vnd.ms-excel': ['xls'],
   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
   'application/xml': ['xml'],
   'application/zip': ['zip'],
} as const;

export const EXTRACT_FILES = ['zip', '7z', '7zip', 'rar', 'tar', 'xz'];

// -------- With enums --------

export const BYTES: Record<EByte, string> = {
   [EByte.StorageBytes]: 'Storage bytes',
   [EByte.EgressBytes]: 'Egress bytes',
   [EByte.ApiOps]: 'API ops',
   [EByte.ObjectCount]: 'Object count',
};

export const PERIODS: Record<EPeriod, string> = {
   [EPeriod.Month]: 'Month',
   [EPeriod.Day]: 'Day',
};

export const ROLE_TYPES: Record<EPermission, string> = {
   [EPermission.Read]: 'share.viewer',
   [EPermission.Write]: 'share.editor',
};

export const GRID_CLASSNAME =
   'grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 xxl:grid-cols-8';

export const oAuth = [EAuthType.Google, EAuthType.Apple];

export const STATUSES: Record<
   EStatus,
   {
      label: string;
      color: string;
   }
> = {
   [EStatus.Blocked]: {
      label: 'Blocked',
      color: 'default',
   },
   [EStatus.Logout]: {
      label: 'Logout',
      color: 'processing',
   },
   [EStatus.Failed]: {
      label: 'Failed',
      color: 'error',
   },
   [EStatus.Success]: {
      label: 'Success',
      color: 'success',
   },
   [EStatus.Active]: {
      label: 'Active',
      color: 'success',
   },
   [EStatus.Disabled]: {
      label: 'Disabled',
      color: 'default',
   },
   [EStatus.Revoked]: {
      label: 'Revoked',
      color: 'red',
   },
   [EStatus.Queued]: {
      label: 'Queued',
      color: 'default',
   },
   [EStatus.Expired]: {
      label: 'Expired',
      color: 'warning',
   },
   [EStatus.Deleted]: {
      label: 'Deleted',
      color: 'red',
   },
   [EStatus.Trashed]: {
      label: 'Trashed',
      color: 'red',
   },
   [EStatus.Paid]: {
      label: 'Paid',
      color: 'success',
   },
   [EStatus.Failure]: {
      label: 'Failure',
      color: 'red',
   },
   [EStatus.Cancelled]: {
      label: 'Cancelled',
      color: 'red',
   },
   [EStatus.Canceled]: {
      label: 'Canceled',
      color: 'red',
   },
   [EStatus.Pending]: {
      label: 'Pending',
      color: 'processing',
   },
   [EStatus.Processing]: {
      label: 'Processing',
      color: 'processing',
   },
   [EStatus.Init]: {
      label: 'Init',
      color: 'processing',
   },
   [EStatus.Succeeded]: {
      label: 'Succeeded',
      color: 'success',
   },
   [EStatus.ConfirmedSuccess]: {
      label: 'Confirmed success',
      color: 'success',
   },
   [EStatus.ConfirmedFailed]: {
      label: 'Confirmed failed',
      color: 'red',
   },
   [EStatus.ProviderPending]: {
      label: 'Provider pending',
      color: 'processing',
   },
   [EStatus.CallbackReceived]: {
      label: 'Callback received',
      color: 'success',
   },
   [EStatus.Redirected]: {
      label: 'Redirected',
      color: 'success',
   },
   [EStatus.Created]: {
      label: 'Created',
      color: 'default',
   },
   [EStatus.Incomplete]: {
      label: 'Incomplete',
      color: 'processing',
   },
   [EStatus.PastDue]: {
      label: 'Past due',
      color: 'warning',
   },
   [EStatus.Published]: {
      label: 'Published',
      color: 'success',
   },
   [EStatus.Draft]: {
      label: 'Draft',
      color: 'default',
   },
   [EStatus.Archived]: {
      label: 'Archived',
      color: 'processing',
   },
   [EStatus.Withdrawn]: {
      label: 'Withdrawn',
      color: 'warning',
   },
   [EStatus.Granted]: {
      label: 'Granted',
      color: 'success',
   },
   [EStatus.Completed]: {
      label: 'Completed',
      color: 'success',
   },
   [EStatus.Ready]: {
      label: 'Ready',
      color: 'success',
   },
};

export const ROLE_OPTIONS: IOption<EPermission>[] = [
   {
      label: ROLE_TYPES.read,
      value: EPermission.Read,
   },
   {
      label: ROLE_TYPES.write,
      value: EPermission.Write,
   },
];

export const BYTE_OPTIONS: IOption<EByte>[] = [
   {
      value: EByte.StorageBytes,
      label: BYTES.storage_bytes,
   },
   {
      value: EByte.EgressBytes,
      label: BYTES.egress_bytes,
   },
   {
      value: EByte.ApiOps,
      label: BYTES.api_ops,
   },
   {
      value: EByte.ObjectCount,
      label: BYTES.object_count,
   },
];

export const PERIOD_OPTIONS: IOption<EPeriod>[] = [
   {
      value: EPeriod.Day,
      label: PERIODS.day,
   },
   {
      value: EPeriod.Month,
      label: PERIODS.month,
   },
];
