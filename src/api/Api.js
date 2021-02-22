import axios from 'axios';
import { get } from 'mobx';

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
  editProfile({ fullName, avatar, phone }) {
    return axios.put(`/api/account`, { fullName, avatar, phone });
  },
};

export const Products = {
  fetchLatest() {
    return axios.get('/api/products/latest');
  },
  getProduct(id) {
    return axios.get(`/api/products/${id}`)
  },
  add( {...data}) {
     return axios.post('/api/products', {...data})
  },
  uploadImage(data) {
    return axios.post(`/api/upload/images`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }})
  },
  save(id) {
    return axios.post(`/api/products/${id}/saved`)
  },
  saved() {
    return axios.get(`/api/products/saved`)
  },
  delete(id) {
    return axios.delete(`/api/products/${id}/saved`)
  },

  fetchOwnProducts(id) {
    return axios.get(`/api/users/${id}/products`)
  },
  search({  keywords, location, priceFrom, priceTo }) {
    if(!keywords && !location)return;
    let link = '/api/products/search?';
    if(keywords) {
      link = link +  `keywords=${keywords}`
    }
    if(location) {
      link = link +  `&location=${location}`
    }
    if(priceFrom) {
      link = link +  `&priceFrom=${priceFrom}`
    }
    if(priceTo) {
      link = link +  `&priceTo=${priceTo}`
    }
    link = link + `&offset=0&limit=20`
    return axios.get(link)
  }
};

export const Chats = {
  createChat(message, id) {
    return axios.post(`/api/products/${id}/createChat`, message)
  },
  getList() {
    return axios.get('/api/chats')
  },
  sendMessage(id, text) {
    return axios.post(`/api/chats/${id}/messages`, { message: text })
  },
  getMessages(id, lastItemId) {
    console.log(lastItemId)
    if (lastItemId) {
      return axios.get(`/api/chats/${id}/messages?from=${lastItemId}&limit=20`);
    }
    return axios.get(`/api/chats/${id}/messages?limit=20`)
  },
  

}
