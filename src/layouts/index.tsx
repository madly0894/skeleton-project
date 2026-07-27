import { Suspense } from 'react';
import { Outlet } from 'react-router';

import Header from './header';
import Sidebar from './sidebar';

const RootLayout: React.FC = () => {
   return (
      <main>
         <Sidebar />
         <Header />
         <section>
            <Suspense fallback='Loading page...'>
               <Outlet />
            </Suspense>
         </section>
      </main>
   );
};

export default RootLayout;
