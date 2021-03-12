import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { SaveProductUnAuthViewer } from 'src/components/Product/SaveProductUnAuthViewer';
import { SearchProductCollection } from '../schemas';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';
import { SearchParamsStore } from './SearchParamsStore';

export const SearchProductsStore = types
  .model('SearchProductsStore', {
    items: types.array(types.reference(ProductModel)),
    searchParams: types.optional(SearchParamsStore, {}),
    fetch: asyncModel(fetchSearchProducts),
    hasMore: true,
  })
  .actions((store) => ({
    setItems(items) {
      store.items = [...store.items, ...items]
    },

    clearItems() {
      store.items = []
    },

    setHasMore(value) {
      store.hasMore = value;
    }
  }));

function fetchSearchProducts() {
  return async function fetchSearchProductsFlow(flow, store, Root) {
    let res;
    try{
      if(store.items[store.items.length - 1].id) {
        res = await Api.Products.search({
          keywords: store.searchParams.keywords,
          location: store.searchParams.location,
          priceFrom: store.searchParams.priceFrom,
          priceTo: store.searchParams.priceTo,
          fetchFrom: store.items[store.items.length - 1].id,
        });
      }
    }catch{
      res = await Api.Products.search({
        keywords: store.searchParams.keywords,
        location: store.searchParams.location,
        priceFrom: store.searchParams.priceFrom,
        priceTo: store.searchParams.priceTo,
      });
    }
    if(res.data.length < 20) {
      store.setHasMore(false)
    }
    const data = SaveProductUnAuthViewer(res.data, Root)
    store.setItems(flow.merge(data, SearchProductCollection));
  };
}


