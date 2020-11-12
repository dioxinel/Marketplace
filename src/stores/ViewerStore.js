import { types } from 'mobx-state-tree';
import { UserModel } from './UserModel';

const ViewerModel = UserModel.named('ViewerModel');

export const ViewerStore = types
  .model('ViewerStore', {
    user: types.maybe(ViewerModel),
    userModel: types.maybe(UserModel),
    isLoggedIn: false,
  })
  .actions((store) => ({
    setIsLoggedIn(value) {
      store.isLoggedIn = value;
    },

    setViewer(user) {
      store.user = user;
    },
  }));
