import { useSyncExternalStore } from 'react';

let capsLockState: boolean | null = null; // null = неизвестно

function handleKey(e: KeyboardEvent) {
   capsLockState = e.getModifierState('CapsLock');
}

function subscribe(callback: () => void) {
   window.addEventListener('keyup', callback);
   window.addEventListener('keydown', callback);
   return () => {
      window.removeEventListener('keyup', callback);
      window.removeEventListener('keydown', callback);
   };
}

window.addEventListener('keyup', handleKey);
window.addEventListener('keydown', handleKey);

function getSnapshot() {
   return capsLockState;
}

export default function useCapsLock() {
   return useSyncExternalStore(subscribe, getSnapshot);
}
