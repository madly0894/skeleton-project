import { Suspense } from 'react';
import { Outlet } from 'react-router';

// import Header from '@/shared/layouts/header';
import Sidebar from '@/shared/layouts/sidebar';

const RootLayout: React.FC = () => {
   return (
      <main>
         <Sidebar />
         {/*<Header />*/}
         <section>
            <Suspense fallback='Loading page...'>
               <Outlet />
            </Suspense>
         </section>
      </main>
   );
};

export default RootLayout;
