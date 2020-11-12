import { types } from 'mobx-state-tree';
import { normalize } from 'normalizr';
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

    const { result, entities } = normalize(res.data, LatestProductCollection)
    Root.entities.merge(entities);

    store.setItems(result);
  };
}
