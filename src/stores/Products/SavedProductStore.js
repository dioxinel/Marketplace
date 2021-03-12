import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { SavedProductCollectionSchema } from '../schemas';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';


export const SavedProductsStore = types
  .model('SavedProductsStore', {
    items: types.array(types.safeReference(ProductModel)),
    hasMore: true,
    fetch: types.late(()=>asyncModel(fetchSavedProducts)),
  })
  .actions((store) => ({
    setItems(items) {
      // if (!!store.items.length) {
      //   return store.items = [...store.items, ...items]
      // }
      return store.items = items;
      
    },
    clearItems() {
      store.items = []
    },
    setHasMore(value) {
      store.hasMore = value;
    },
  }));

function fetchSavedProducts() {
  return async function fetchSavedProductsFlow(flow, store, Root) {
    let res;
    console.log(Root.viewer.isLoggedIn)
    if (Root.viewer.isLoggedIn) {
      try{
        res = await Api.Products.saved(store.items[store.items.length - 1].id);
      }catch{
        res = await Api.Products.saved();
      }
    } else {
      const savedItemList = [...localStorage.getItem('___savedProducts').split(',')];
      res = await Api.Products.getListById(savedItemList)
      res.data.map(item => item.saved = true);
    }
    if(res.data.length < 20) {
      store.setHasMore(false)
    }
    
    store.setItems(flow.merge(res.data, SavedProductCollectionSchema));
  };
}


