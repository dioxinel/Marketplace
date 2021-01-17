import { getParent, types } from 'mobx-state-tree';
import { normalize } from 'normalizr';
import Api from 'src/api';
import { LatestProductCollection } from '../schemas';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';

export const OwnProductsStore = types.model('OwnProductsStore', {
  items: types.array(types.reference(types.late(() => ProductModel))),

  fetch: asyncModel(fetchOwnProducts)
}).actions((store) => ({
  addItems(items) {
    store.items = items
  }
}));

function fetchOwnProducts() {
  return async function fetchOwnProductsFlow(flow, store, Root) {
    const res = await Api.Products.fetchOwnProducts(getParent(store).id);
    const { result, entities } = normalize(res.data.list, LatestProductCollection)
    Root.entities.merge(entities);

    store.addItems(result)
  }
}