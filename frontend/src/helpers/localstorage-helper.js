import JwtDecode from 'jwt-decode';

const LocalStorageHelper = {
  setToken(token) {
    window.localStorage.setItem('AUTHENTICATION_TOKEN', token);
  },
  getToken() {
    return window.localStorage.getItem('AUTHENTICATION_TOKEN');
  },
  getUsuarioId() {
    const token = LocalStorageHelper.getToken();
      const payload = JwtDecode(token);
      return payload.id;
  },
  removeToken() {
    window.localStorage.removeItem('AUTHENTICATION_TOKEN');
  },
  isAuthenticated() {
    try {
      const token = LocalStorageHelper.getToken();

      if (!token) return false;
      const payload = JwtDecode(token);

      const expirationDate = new Date(payload.exp * 1000);
      const currentDate = new Date();
      
      return expirationDate > currentDate;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },
};

export default LocalStorageHelper;
