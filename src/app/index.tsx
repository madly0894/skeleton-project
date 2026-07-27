import { Provider as StoreProvider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';

import ThemeProvider from '@/providers/theme';
import history from '@/shared/common/history';
import ErrorBoundary from '@/shared/components/error-boundary';
import { persistor, store } from '@/shared/store';

import Routes from '../routes';

import Auth from './auth';

const App: React.FC = () => {
   return (
      <ErrorBoundary>
         <HistoryRouter history={history as never}>
            <StoreProvider store={store}>
               <PersistGate persistor={persistor} loading={null}>
                  <ThemeProvider>
                     <Auth>
                        <Routes />
                     </Auth>
                  </ThemeProvider>
               </PersistGate>
            </StoreProvider>
         </HistoryRouter>
      </ErrorBoundary>
   );
};

export default App;
