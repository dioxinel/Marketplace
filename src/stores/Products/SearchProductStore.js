import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { SearchProductCollection } from '../schemas';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';

export const SearchProductsStore = types
  .model('SearchProductsStore', {
    items: types.array(types.reference(ProductModel)),

    fetch: asyncModel(fetchSearchProducts),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchSearchProducts(
    keywords,
    location,
    priceFrom,
    priceTo) {
  return async function fetchSearchProductsFlow(flow, store, Root) {
    const res = await Api.Products.search(
        keywords,
        location,
        priceFrom,
        priceTo);
      console.log(res.data)
    store.setItems(flow.merge(res.data, SearchProductCollection));
  };
}
