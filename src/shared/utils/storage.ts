export default class StorageUtils {
   static setToken(token: string) {
      return localStorage.setItem('access_token', token);
   }

   static getToken() {
      const session = localStorage.getItem('access_token');
      return session ? JSON.parse(session) : null;
   }

   static removeToken() {
      return localStorage.removeItem('access_token');
   }
}
