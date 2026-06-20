import { useEffect, useRef } from 'react';

export default function useEventListener<K extends keyof WindowEventMap & keyof HTMLElementEventMap>(
   event: K,
   handler: (e: WindowEventMap[K] | HTMLElementEventMap[K]) => void,
   ref?: React.RefObject<HTMLElement>,
) {
   const handlerRef = useRef<(e: WindowEventMap[K] | HTMLElementEventMap[K]) => void>(handler);

   useEffect(() => {
      const target = ref?.current ?? window;
      const listener = (e: Event) => handlerRef.current(e as never);

      target.addEventListener(event, listener);
      return () => target.removeEventListener(event, listener);
   }, [event, ref]);
}
