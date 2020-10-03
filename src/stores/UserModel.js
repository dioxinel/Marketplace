import { types } from 'mobx-state-tree';

export const UserModel = types.model('UserModel', {
  id: types.number,
  fullName: types.string,
  location: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
  phone: types.maybeNull(types.string),
  createdAt: types.maybeNull(types.string),
  updatedAt: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
});
