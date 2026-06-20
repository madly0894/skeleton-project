const ROUTES = {
   LANG: ':lang?',
   HOME: {
      path: 'home',
      to: '/home',
   },
   AUTH: 'auth',
   LOGIN: {
      path: 'login',
      to: '/auth/login',
   },
   MAINTENANCE: {
      path: 'maintenance',
      to: '/maintenance',
   },
   ERROR_404: {
      path: '404',
      to: '/404',
   },
   NOT_FOUND: '*',
} as const;

export default ROUTES;
