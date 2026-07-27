export enum ERole {
   Administrator = 'Administrator',
   User = 'User',
   Moderator = 'Moderator',
}

export enum EType {
   File = 'file',
   Folder = 'folder',
   Favorite = 'favorite',
   Deleted = 'deleted',
   Shared = 'shared',
   MyShared = 'myshared',
   MySharedLinks = 'mysharedlinks',
   Album = 'album',
   Photo = 'photo',
}

export enum EPermission {
   Write = 'write',
   Read = 'read',
}

export enum EAuthType {
   Ldap = 'ldap',
   Local = 'local',
   Google = 'google',
   Apple = 'apple',
}

export enum EErrorCode {
   AccountDeletionPending = 'ACCOUNT_DELETION_PENDING',
   EmailNotConfirmed = 'EMAIL_NOT_CONFIRMED',
}

export enum EStatus {
   Success = 'success',
   Logout = 'logout',
   Failed = 'failed',
   Blocked = 'blocked',
   Revoked = 'revoked',
   Expired = 'expired',
   Active = 'active',
   Disabled = 'disabled',
   Deleted = 'deleted',
   Trashed = 'trashed',
   Queued = 'queued',
   // Billig
   Paid = 'paid',
   Failure = 'failure',
   Cancelled = 'cancelled',
   Canceled = 'canceled',
   Pending = 'pending',
   Processing = 'processing',
   Init = 'init',
   PastDue = 'past_due',
   Incomplete = 'incomplete',
   Succeeded = 'succeeded',
   ConfirmedSuccess = 'confirmed_success',
   ConfirmedFailed = 'confirmed_failed',
   ProviderPending = 'provider_pending',
   Created = 'created',
   Redirected = 'redirected',
   CallbackReceived = 'callback_received',
   // Legal
   Published = 'published',
   Draft = 'draft',
   Archived = 'archived',
   Withdrawn = 'withdrawn',
   Granted = 'granted',
   // File
   Ready = 'ready',
   Completed = 'completed',
}

export enum EByte {
   StorageBytes = 'storage_bytes',
   EgressBytes = 'egress_bytes',
   ApiOps = 'api_ops',
   ObjectCount = 'object_count',
}

export enum EFilePolicy {
   Block = 'block',
   Unblock = 'unblock',
}

export enum EPeriod {
   Month = 'month',
   Day = 'day',
}

export enum ELegalSlug {
   Terms = 'terms',
   Privacy = 'privacy',
   Subprocessors = 'subprocessors',
   DPA = 'dpa',
}

export enum EAction {
   BlockUpload = 'BLOCK_UPLOAD', // <- Загрузка запрещена
   AllowNoPublic = 'ALLOW_NO_PUBLIC', // <- Загрузка разрешена, но нельзя создавать публичные ссылки
   AllowPublicRestricted = 'ALLOW_PUBLIC_RESTRICTED', // <- Загрузка разрешена, можно создавать публичные ссылки, но обязательно нужно указывать пароль на публичную ссылку.
   LogOnly = 'LOG_ONLY', // <- Только логировать
   QuarantineUntilScan = 'QUARANTINE_UNTIL_SCAN', //<- Помечтить в карантин пока не завершится сканирование на вирусы *Пока не используется из за отсуствия антивируса.
}

export enum EDecision {
   DecisionDeny = 'DENY',
   DecisionAllow = 'ALLOW',
   DecisionAllowWithConstraints = 'ALLOW_WITH_CONSTRAINTS',
   DecisionQuarantine = 'QUARANTINE',
}
