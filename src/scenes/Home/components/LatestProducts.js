import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef } from 'react';
import { useStore } from 'src/stores/createStore';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductsListItem from '../../ProductView/ProductsListItem';
import { PriceRange } from '../../ProductView/Search/components/PriceRange';
import s from '../Home.module.scss';

function LatestProducts() {
  const store = useStore((store) => store.latestProducts);
  useEffect(() => {
    store.fetchLatest.run();
  }, []);

  const observer = useRef();
  const cb = useCallback((node) => {
    if (store.fetchLatest.isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setTimeout(() => { store.fetchLatest.run(); });
    });
    if (node) { observer.current.observe(node); }
  }, [store.fetchLatest.isLoading, true]);

  if (!store.items.length) {
    return (
      <div className={s.pageBody}>
        <ul className={s.productsList}>
          <ClipLoader color="#349A89" loading={store.fetchLatest.isLoading} size={50} />
        </ul>
      </div>
    );
  }

  return (
    <div className={s.pageBody}>
      <ul className={s.productsList}>
        <PriceRange />
        {store.items.map((item, index) => {
          let callback;
          if (store.items.length === index + 1) {
            callback = cb;
          }
          return (
            <ProductsListItem item={item} key={item.id} cb={callback} />
          );
        })}
      </ul>
      <ClipLoader color="#349A89" loading={store.fetchLatest.isLoading} size={50} />
    </div>
  );
}

export default observer(LatestProducts);
