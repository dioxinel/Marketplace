import Api from 'src/api';
import { useStore } from '../createStore';
import { asyncModel, createCollection } from '../utils';
import { UserModel } from './UserModel';

export function useUserCollection() {
  const store = useStore();
  return store.entities.users;
}

export const UserCollection = createCollection(UserModel, {
  getUser: asyncModel(getUser),
});

function getUser(id) {
  return async function getUserFlow(flow, store, Root) {
    const user = store.collection.get(id);
    if (user) return;
    const res = await Api.Account.getUserById(id);
    store.add(res.data.id, res.data);
    return store.collection.get(id);
  };
}
