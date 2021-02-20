import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { SearchProductCollection } from '../schemas';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';
import { SearchParamsStore } from './SearchParamsStore';

export const SearchProductsStore = types
  .model('SearchProductsStore', {
    items: types.array(types.reference(ProductModel)),
    searchParams: types.optional(SearchParamsStore, {}),
    fetch: asyncModel(fetchSearchProducts),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchSearchProducts() {
  return async function fetchSearchProductsFlow(flow, store, Root) {
    const res = await Api.Products.search({
      keywords: store.searchParams.keywords,
      location: store.searchParams.location,
      priceFrom: store.searchParams.priceFrom,
      priceTo: store.searchParams.priceTo
    });
    store.setItems(flow.merge(res.data, SearchProductCollection));
  };
}


