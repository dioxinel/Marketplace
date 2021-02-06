import { types } from 'mobx-state-tree';
import { OwnProductsStore } from '../Products/OwnProductsStore';

export const UserModel = types.model('UserModel', {
  id: types.identifierNumber,
  fullName: types.string,
  location: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
  phone: types.maybeNull(types.string),
  createdAt: types.maybeNull(types.string),
  updatedAt: types.maybeNull(types.string),
  email: types.maybeNull(types.string),

  ownProducts: types.optional(OwnProductsStore, {})
}).actions((store) => ({
  setAvatar(link) {
    store.avatar = link;
  }
}));
