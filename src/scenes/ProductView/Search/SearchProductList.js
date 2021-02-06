import { observer } from 'mobx-react';
import React from 'react';
import { useStore } from 'src/stores/createStore';
import ProductsListItem from '../ProductsListItem';
import s from './SearchProduct.module.scss';

function SearchProductList() {
  const store = useStore();
  if(store.searchProducts.items.length) {
  return (
    <div className={s.pageBody}>
      <ul className={s.productsList}>
        {store.searchProducts.items.map((item) => {
          return (
            <ProductsListItem item={item} key={item.id}/>
          );
        })}
      </ul>

    </div>
  );
}
return(<div>Loading</div>)
}

export default observer(SearchProductList);