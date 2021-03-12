import { types } from 'mobx-state-tree';
import Api, { SocketApi } from 'src/api';
import { AuthStore } from './Auth/AuthStore';
import { ChatStore } from './Chats/ChatStore';
import { MessageStore } from './Chats/MessageStore';
import { EntitiesStore } from './EntitiesStore';
import { LatestProductsStore } from './Products/LatestProductsStore';
import { SavedProductsStore } from './Products/SavedProductStore';
import { SearchProductsStore } from './Products/SearchProductStore';
import { SetProductPhotoStore } from './Products/SetProductPhotoStore';
import { ViewerStore } from './ViewerStore';

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),
    latestProducts: types.optional(LatestProductsStore, {}),
    searchProducts: types.optional(SearchProductsStore, {}),
    savedProducts: types.optional(SavedProductsStore, {}),
    setProductPhoto: types.optional(SetProductPhotoStore, {}),

    chats: types.optional(ChatStore, {}),

    entities: types.optional(EntitiesStore, {}),
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
    subscribeToEvents() {
      SocketApi.handleMessages((message) => {
        store.chats.handleMessage(message);
      });
    },
  }));
