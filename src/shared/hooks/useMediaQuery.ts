import { useRef, useSyncExternalStore } from 'react';

type Queries = Record<string, string>;

export default function useMediaQuery<T extends Queries>(queries: T): Record<keyof T, boolean> {
   const keys = Object.keys(queries) as (keyof T)[];

   const mediasRef = useRef<Map<keyof T, MediaQueryList>>(
      new Map(keys.map(key => [key, window.matchMedia(queries[key])])),
   );

   const subscribe = (onStoreChange: VoidFunction) => {
      mediasRef.current.forEach(media => media.addEventListener('change', onStoreChange));
      return () => mediasRef.current.forEach(media => media.removeEventListener('change', onStoreChange));
   };

   const getSnapshot = () => JSON.stringify(keys.map(key => mediasRef.current.get(key)!.matches));

   const getServerSnapshot = () => JSON.stringify(keys.map(() => false));

   const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
   const values: boolean[] = JSON.parse(snapshot);

   return keys.reduce(
      (acc, key, i) => {
         acc[key] = values[i];
         return acc;
      },
      {} as Record<keyof T, boolean>,
   );
}
