import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef } from 'react';
import { useStore } from 'src/stores/createStore';
import ClipLoader from 'react-spinners/ClipLoader';
import { NoItems } from 'src/components/Product/NoItems';
import ProductsListItem from '../ProductsListItem';
import { PriceRange } from './components/PriceRange';
import s from './SearchProduct.module.scss';

function SearchProductList() {
  const store = useStore((store) => store.searchProducts);

  const observer = useRef();
  const cb = useCallback((node) => {
    if (store.fetch.isLoading) return;
    if (observer.current) observer.current.disconnect();
    if (!store.hasMore) return;
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setTimeout(() => { store.fetch.run(); }, 1000);
    });
    if (node) { observer.current.observe(node); }
  }, [store.fetch.isLoading, store.hasMore]);

  if (store.items.length) {
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

      </div>
    );
  }

  if (!store.fetch.isLoading) {
    return (<NoItems text="No matches" />);
  }
  return (
    <div className={s.pageBody}>
      <ClipLoader color="#349A89" loading={store.fetch.isLoading} size={50} />
    </div>
  );
}

export default observer(SearchProductList);
