import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useStore } from 'src/stores/createStore';
import ProductsListItem from '../ProductView/ProductsListItem';
import { PriceRange } from '../ProductView/Search/components/PriceRange';
import s from './Home.module.scss';

function Home() {
  const store = useStore();
  useEffect(() => {
      store.latestProducts.fetchLatest.run();
});

  if(!store.latestProducts.items.length) {
    return (
      <div className={s.pageBody}>
        <ul className={s.productsList}>
        <PriceRange />
        <ProductsListItem key={1}/>
        <ProductsListItem key={2}/>
        <ProductsListItem key={3}/>
        <ProductsListItem key={4}/>
      </ul>
    </div>
    )
  }
  return (
    <div className={s.pageBody}>
      <ul className={s.productsList}>
      <PriceRange />
        {store.latestProducts.items.map((item) => {
          return (
            <ProductsListItem item={item} key={item.id}/>
          );
        })}
      </ul>

    </div>
  );
}

export default observer(Home);
