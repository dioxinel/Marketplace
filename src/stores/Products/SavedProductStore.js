import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { SavedProductCollectionSchema, SearchProductCollection } from '../schemas';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';
import { SearchParamsStore } from './SearchParamsStore';

export const SavedProductsStore = types
  .model('SavedProductsStore', {
    items: types.array(types.reference(ProductModel)),
    
    fetch: asyncModel(fetchSavedProducts),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchSavedProducts() {
  return async function fetchSavedProductsFlow(flow, store, Root) {
    let res;
    if (Root.viewer.user) {
      res = await Api.Products.saved();
    } else {
      const savedItemList = [...localStorage.getItem('___savedProducts').split(',')];
      res = await Api.Products.getListById(savedItemList)
      res.data.map(item => item.saved = true);
    }
    
    store.setItems(flow.merge(res.data, SavedProductCollectionSchema));
  };
}


