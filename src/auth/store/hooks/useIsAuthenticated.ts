import { useSyncExternalStore } from 'react';

import StorageUtils from '@/shared/utils/storage.utils';

type ChannelMessage = { type: 'logout' } | { type: 'login' };

const listeners = new Set<VoidFunction>();
const channel = new BroadcastChannel('auth');

let isAuthenticated = !!StorageUtils.getToken();

function subscribe(listener: VoidFunction): VoidFunction {
   listeners.add(listener);
   return () => listeners.delete(listener);
}

function getSnapshot(): boolean {
   return isAuthenticated;
}

function notify(): void {
   listeners.forEach(fn => fn());
}

export function setAuth(type: 'login' | 'logout', isNotify = true): void {
   isAuthenticated = type === 'login';

   if (isNotify) {
      notify();
      channel.postMessage({ type });
   }
}

channel.onmessage = (e: MessageEvent<ChannelMessage>) => {
   if (['login', 'logout'].includes(e.data.type)) {
      window.location.reload();
   }
};

export function useIsAuthenticated(): boolean {
   return useSyncExternalStore(subscribe, getSnapshot);
}
