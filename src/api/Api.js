import axios from 'axios';

export const Auth = {
  _token: null,

  setToken(token) {
    this._token = token;
    window.localStorage.setItem('___token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  isLoggedIn() {
    return !!this._token;
  },

  login({ email, password }) {
    return axios.post('/api/auth/login', {
      email: email,
      password: password,
    });
  },

  logout(delUser) {
    this.setToken('');
    delUser('');
  },

  register({ email, password, fullName }) {
    return axios.post('/api/auth/register', {
      email,
      password,
      fullName,
    });
  },
};

export const Account = {
  getUser() {
    return axios.get('/api/account', {});
  },
};
