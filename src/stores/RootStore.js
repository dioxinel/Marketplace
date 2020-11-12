import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { AuthStore } from './Auth/AuthStore';
import { EntitiesStore } from './EntitiesStore';
import { LatestProductsStore } from './Products/LatestProductsStore';
import { ViewerStore } from './ViewerStore';

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),
    latestProducts: types.optional(LatestProductsStore, {}),

    entities: types.optional(EntitiesStore, {})
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
        store.viewer.setIsLoggedIn(true);
      } catch (err) {}
    },
  }));
