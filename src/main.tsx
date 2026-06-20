import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

import App from './app';

import './styles/index.css';

createRoot(document.getElementById('root')!).render(
   // <StrictMode>
   <>
      <App />
      <Toaster />
   </>,
   // </StrictMode>,
);
