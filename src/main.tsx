import { createRoot } from 'react-dom/client';
import { InfoIcon } from 'lucide-react';
import { Toaster } from 'sonner';

import { AUTO_CLOSE } from '@/shared/common/constants';

import App from './app';

import './styles/index.css';

createRoot(document.getElementById('root')!).render(
   // <StrictMode>
   <>
      <App />
      <Toaster
         duration={AUTO_CLOSE}
         position='bottom-left'
         expand
         gap={16}
         icons={{
            info: <InfoIcon />,
         }}
         richColors
         // invert
         offset={{
            left: 16,
            bottom: 16,
         }}
      />
   </>,
   // </StrictMode>,
);
