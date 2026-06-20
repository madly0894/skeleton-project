import { useSyncExternalStore } from 'react';

export default function useNetworkStatus() {
   return useSyncExternalStore(
      onStoreChange => {
         const controller = new AbortController();
         const { signal } = controller;

         const notify = () => onStoreChange();

         window.addEventListener('online', notify, { signal });
         window.addEventListener('offline', notify, { signal });

         return () => controller.abort();
      },
      () => navigator.onLine,
      () => true, // SSR fallback
   );
}
