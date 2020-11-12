import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { generatePath, NavLink } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import Header from '../../components/Header/Header';
import { routes } from '../routes';

function Home() {
  const store = useStore();
  useEffect(() => {
      store.latestProducts.fetchLatest.run();
});
  return (
    <div>
      <Header />
      <ul>
        {store.latestProducts.items.map((item) => {
          return (
            <NavLink
              to={generatePath(routes.product, {
                productId: item.id,
              })}
              key={item.id}
            >
              <li>{item.title}</li>
            </NavLink>
          );
        })}
      </ul>

    </div>
  );
}

export default observer(Home);
