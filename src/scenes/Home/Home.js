import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useStore } from 'src/stores/createStore';
import ProductsListItem from '../ProductView/ProductsListItem';
import { PriceRange } from '../ProductView/Search/components/PriceRange';
import LatestProducts from './components/LatestProducts';
import s from './Home.module.scss';

function Home() {
  return (
    <LatestProducts />
  );
}

export default observer(Home);
