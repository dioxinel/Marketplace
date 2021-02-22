import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useStore } from 'src/stores/createStore';
import ProductsListItem from '../ProductsListItem';
import s from './SavedProducts.module.scss';

export const SavedProducts = observer(() => {
  const store = useStore((store) => {return store.savedProducts})
  useEffect(()=>{
    store.fetch.run()
  }, [])

  if(!!store.items.length) {
  return (
    <div className={s.pageBody}>
      
      <ul className={s.productsList}>
        <div className={s.title}>Saved Items</div>
        {store.items.map((item) => {
          return (
            <ProductsListItem item={item} key={item.id}/>
          );
        })}
      </ul>

    </div>
  );
}

}
)
