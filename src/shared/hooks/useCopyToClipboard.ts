import { useState } from 'react';
import { type ExternalToast, toast } from 'sonner';

type TProps = {
   delay?: number;
   messageText?: string;
};

export default function useCopyToClipboard({ delay = 3000, messageText = 'Link copied!' }: TProps = {}) {
   const [copied, setCopied] = useState<boolean>(false);

   const copy = async (text: string) => {
      if (typeof navigator === 'undefined' || !navigator.clipboard) {
         toast.warning('Clipboard not supported on this browser.', {
            duration: delay,
         });
         return;
      }

      const toastOptions: ExternalToast = {
         duration: delay,
         onAutoClose: () => setCopied(false),
      };

      try {
         await navigator.clipboard.writeText(text);
         setCopied(true);
         toast.success(messageText, toastOptions);
      } catch {
         toast.error('Failed to copy!', toastOptions);
      }
   };

   return {
      copied,
      copy,
   };
}
