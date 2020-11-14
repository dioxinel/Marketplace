import { types } from 'mobx-state-tree';
import { UserModel } from '../UserModel'


export const ProductModel = types.model('ProductModel', {
  id: types.identifierNumber,
  description: types.string,
  ownerId: types.number,
  title: types.string,
  photos: types.maybeNull(types.array(types.string)),
  location: types.string,
  price: types.number,
  saved: false,
  createdAt: types.string,
  updatedAt: types.string,
  owner: types.maybe(types.reference(UserModel))
}).actions((store) => ({
  save() {
    store.saved = !store.saved;
  }
})
)
