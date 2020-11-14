import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useStore } from 'src/stores/createStore';
import ProductsListItem from '../ProductView/ProductsListItem';
import s from './Home.module.scss';

function Home() {
  const store = useStore();
  useEffect(() => {
      store.latestProducts.fetchLatest.run();
});
  return (
    <div className={s.pageBody}>
      <ul className={s.productsList}>
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
