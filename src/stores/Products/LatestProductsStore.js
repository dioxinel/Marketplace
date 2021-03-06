import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { SaveProductUnAuthViewer } from 'src/components/Product/SaveProductUnAuthViewer';
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
      store.items = [ ...store.items, ...items];
    },
  }));

function fetchLatest() {
  return async function fetchLatestFlow(flow, store, Root) {
    let res;
    try{
      if(store.items[store.items.length - 1].id) {
        res = await Api.Products.fetchLatest(store.items[store.items.length - 1].id);
      }
    }catch{
      res = await Api.Products.fetchLatest();
    }
    
    const data = SaveProductUnAuthViewer(res.data, Root)
    store.setItems(flow.merge(data, LatestProductCollection));
  };
}
