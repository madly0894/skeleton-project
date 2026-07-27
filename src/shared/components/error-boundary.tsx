import { ErrorBoundary as ErrorComponent, type FallbackProps } from 'react-error-boundary';

import BaseUtils from '@/shared/utils/base.utils';

function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
   return (
      <div className='center h-dvh px-4'>
         <div role='alert' className='p-4 text-center max-w-125 z-1'>
            <p>Something went wrong!</p>
            <p className='text-red mt-2.5 mb-3.5 break-all text-xs'>
               {typeof error === 'string' ? error : error instanceof Error ? error.message : 'Failed to load'}
            </p>
            <button onClick={resetErrorBoundary} className='mx-auto'>
               Try again
            </button>
         </div>
      </div>
   );
}

const ErrorBoundary: React.FC<React.PropsWithChildren> = ({ children }) => {
   return (
      <ErrorComponent
         onError={error => {
            if (BaseUtils.getIsBundleError((error as any)?.message)) {
               window.location.reload();
            }
         }}
         fallbackRender={props =>
            !BaseUtils.getIsBundleError((props.error as any)?.message) ? fallbackRender(props) : null
         }
         onReset={() => {
            // Reset the state of your app so the error doesn't happen again
            window.location.reload();
         }}
      >
         {children}
      </ErrorComponent>
   );
};

export default ErrorBoundary;
