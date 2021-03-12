import React from 'react';
import Icon from 'src/components/Icon';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores/createStore';
import s from '../SearchProduct.module.scss';
import { ChoseCategory } from './ChoseCategory';

export const PriceRange = observer(() => {
  const store = useStore((store) => store.searchProducts);
  const { priceFrom } = store.searchParams;
  const { priceTo } = store.searchParams;

  function handleChangePriceFrom(e) {
    store.searchParams.setPriceFrom(e.target.value);
  }

  function handleChangePriceTo(e) {
    store.searchParams.setPriceTo(e.target.value);
  }

  return (
    <div className={s.priceRange}>
      <ChoseCategory />
      <input
        value={priceFrom}
        onChange={handleChangePriceFrom}
        placeholder="Price from (USD)"
      />
      <div className={s.hyphen} />
      <input
        value={priceTo}
        onChange={handleChangePriceTo}
        placeholder="Price to (USD)"
      />
    </div>
  );
});
