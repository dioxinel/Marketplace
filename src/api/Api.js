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

  logout() {
    this.setToken('');
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
  getUserById(id) {
    return axios.get(`/api/users/${id}`);
  },
};

export const Products = {
  fetchLatest() {
    return axios.get('/api/products/latest');
  },
  getProduct(id) {
    return axios.get(`/api/products/${id}`)
    
  },
  async add({ ...values }) {
    return await axios.post('/api/products', { ...values })
  },
  save(id) {
    return axios.post(`/api/products/${id}/saved`)
  },
  delete(id) {
    return axios.delete(`/api/products/${id}/saved`)
  },

  fetchOwnProducts(id) {
    return axios.get(`/api/users/${id}/products`)
  },
};
