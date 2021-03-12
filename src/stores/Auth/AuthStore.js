import { types, getRoot } from 'mobx-state-tree';
import Api from 'src/api';
import { asyncModel } from '../utils';

export const AuthStore = types.model('AuthStore', {
  error: false,
  login: asyncModel(loginFlow),
})
.actions((store) => ({
  setError(value) {
    store.error = value;
  }
}));


function loginFlow({ email, password }) {
  return async (flow, store) => {
    try {
      const res = await Api.Auth.login({ email, password });
      Api.Auth.setToken(res.data.token);
  
      getRoot(flow).viewer.setViewer(res.data.user);
    } catch {
      store.setError(true)
      console.log(store.error)
    }
   
  };
}
