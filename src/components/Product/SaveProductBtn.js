import React from 'react';
import Icon from 'src/components/Icon';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores/createStore';
import s from './ProductComponents.module.scss';

function SaveProductBtn({ item }) {
  const store = useStore();
  const collection = useProductCollection();

  function handleClick(e) {
    const node = e.target.closest('svg');
    if (node) {
      if (store.viewer.user) {
        collection.saveProduct.run(item.id);
        return;
      }

      if (!localStorage.getItem('___savedProducts')) {
        localStorage.setItem('___savedProducts', [item.id]);
      } else {
        if (item.saved) {
          const savedProducts = [...localStorage.getItem('___savedProducts').split(',')];
          savedProducts.splice(savedProducts.indexOf(`${item.id}`), 1);
          localStorage.setItem('___savedProducts', savedProducts);
          item.save();
          return;
        }
        const savedProducts = [`${item.id}`, ...localStorage.getItem('___savedProducts').split(',')];
        localStorage.setItem('___savedProducts', savedProducts);
      }
      collection.get(item.id).save();
    }
  }

  return (
    <div className={s.saveContainer} onClick={handleClick}>
      <Icon
        name="saved"
        saved={item.saved}
        className={s.save}
      />
    </div>

  );
}

export default observer(SaveProductBtn);
