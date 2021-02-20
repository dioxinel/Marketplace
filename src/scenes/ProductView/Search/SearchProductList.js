import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useStore } from 'src/stores/createStore';
import ProductsListItem from '../ProductsListItem';
import { PriceRange } from './components/PriceRange';
import s from './SearchProduct.module.scss';

function SearchProductList() {
  const store = useStore();
  
  if(!!store.searchProducts.items.length) {
  return (
    <div className={s.pageBody}>
      <ul className={s.productsList}>
        <PriceRange />
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