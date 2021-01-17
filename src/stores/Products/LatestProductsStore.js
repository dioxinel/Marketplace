import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { LatestProductCollection } from '../schemas';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';

export const LatestProductsStore = types
  .model('LatestProductsStore', {
    items: types.array(types.reference(ProductModel)),

    fetchLatest: asyncModel(fetchLatest),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchLatest() {
  return async function fetchLatestFlow(flow, store, Root) {
    const res = await Api.Products.fetchLatest();
    store.setItems(flow.merge(res.data, LatestProductCollection));
  };
}
