import { types, getRoot } from 'mobx-state-tree';
import Api from 'src/api';
import { asyncModel } from '../utils';

export const AuthStore = types.model('AuthStore', {
  login: asyncModel(loginFlow),
});

function loginFlow({ email, password }) {
  return async (flow) => {
    const res = await Api.Auth.login({ email, password });
    console.log(res.data);

    Api.Auth.setToken(res.data.token);

    getRoot(flow).viewer.setViewer(res.data.user);
  };
}
