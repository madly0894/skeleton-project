import { createRoot } from 'react-dom/client';
import { InfoIcon } from 'lucide-react';
import { Toaster } from 'sonner';

import { AUTO_CLOSE } from './shared/common/constants';
import App from './app';

import './shared/i18n/config';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
   // <StrictMode>
   <>
      <App />
      <Toaster
         duration={AUTO_CLOSE}
         position='bottom-left'
         icons={{
            info: <InfoIcon />,
         }}
         offset={{
            left: 16,
            bottom: 16,
         }}
      />
   </>,
   // </StrictMode>,
);
