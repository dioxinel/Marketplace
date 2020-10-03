import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { AuthStore } from './Auth/AuthStore';
import { ViewerStore } from './ViewerStore';

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),
  })
  .actions((store) => ({
    async bootstrap() {
      try {
        const token = window.localStorage.getItem('___token');
        if (!token) {
          return;
        }
        Api.Auth.setToken(token);
        const res = await Api.Account.getUser();
        store.viewer.setViewer(res.data);
        console.log(store.viewer.user);
      } catch (err) {}
    },
  }));
