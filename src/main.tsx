import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

import { AUTO_CLOSE } from '@/shared/common/constants';

import App from './app';

import './styles/index.css';

createRoot(document.getElementById('root')!).render(
   // <StrictMode>
   <>
      <App />
      <Toaster duration={AUTO_CLOSE} position='bottom-center' />
   </>,
   // </StrictMode>,
);
