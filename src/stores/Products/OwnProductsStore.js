import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';

export const OwnProductsStore = types.model('OwnProductsStore', {
  items: types.array(types.late(() => ProductModel)),

  fetch: asyncModel(fetchOwnProducts)
}).actions((store) => ({
  addItems(items) {
    store.items = items
  }
}));

function fetchOwnProducts(id) {
  return async function fetchOwnProductsFlow(flow, store, Root) {
    const res = await Api.Products.fetchOwnProducts(id);
    store.addItems(res.data.list)
  }
}