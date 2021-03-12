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
      email,
      password,
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
    return axios.put('/api/account', { fullName, avatar, phone });
  },
};

export const Products = {
  fetchLatest(lastItemId) {
    if (lastItemId) {
      return axios.get(`/api/products/latest?from=${lastItemId}`);
    }
    return axios.get('/api/products/latest');
  },
  getProduct(id) {
    return axios.get(`/api/products/${id}`);
  },
  add({ ...data }) {
    return axios.post('/api/products', { ...data });
  },
  uploadImage(data) {
    return axios.post('/api/upload/images', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  save(id) {
    return axios.post(`/api/products/${id}/saved`);
  },
  saveList(list) {
    return axios.post('/api/products/saved', { ids: list });
  },
  saved(lastItemId) {
    if (lastItemId) {
      return axios.get(`/api/products/saved?from=${lastItemId}&limit=20`);
    }
    return axios.get('/api/products/saved');
  },

  getListById(list) {
    // if (!!list.length) {
    //   const res = {}
    //   return res.data = []
    // }

    let link = '/api/products/ids?';
    list.map((item) => {
      link += `&id=${item}`;
    });
    return axios.get(link);
  },
  delete(id) {
    return axios.delete(`/api/products/${id}/saved`);
  },

  fetchOwnProducts(id) {
    return axios.get(`/api/users/${id}/products`);
  },
  search({
    keywords, location, priceFrom, priceTo, fetchFrom,
  }) {
    if (!keywords && !location) return;
    let link = '/api/products/search?';
    if (keywords) {
      link += `keywords=${keywords}`;
    }
    if (location) {
      link += `&location=${location}`;
    }
    if (priceFrom) {
      link += `&priceFrom=${priceFrom}`;
    }
    if (priceTo) {
      link += `&priceTo=${priceTo}`;
    }
    if (fetchFrom) {
      link += `&offset=${fetchFrom}`;
    }

    return axios.get(link);
  },
};

export const Chats = {
  createChat(message, id) {
    return axios.post(`/api/products/${id}/createChat`, message);
  },
  getList() {
    return axios.get('/api/chats');
  },
  sendMessage(id, text) {
    return axios.post(`/api/chats/${id}/messages`, { message: text });
  },
  getMessages(id, lastItemId) {
    if (lastItemId) {
      return axios.get(`/api/chats/${id}/messages?from=${lastItemId}&limit=20`);
    }
    return axios.get(`/api/chats/${id}/messages?limit=20`);
  },

};
