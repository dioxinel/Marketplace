import { observer } from 'mobx-react';
import React from 'react';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import Icon from 'src/components/Icon';
import { useParams } from 'react-router';
import { useStore } from 'src/stores/createStore';
import s from '../../ProductDescription.module.scss';

export const SaveProduct = observer(() => {
  const { productId } = useParams();
  const store = useStore();
  const collection = useProductCollection();
  const product = collection.collection.get(productId);

  function handleClick() {
    if (store.viewer.user) {
      collection.saveProduct.run(product.id);
      return;
    }

    if (!localStorage.getItem('___savedProducts')) {
      localStorage.setItem('___savedProducts', [product.id]);
    } else {
      if (product.saved) {
        const savedProducts = [...localStorage.getItem('___savedProducts').split(',')];
        savedProducts.splice(savedProducts.indexOf(`${product.id}`), 1);
        localStorage.setItem('___savedProducts', savedProducts);
        product.save();
        return;
      }
      const savedProducts = [`${product.id}`, ...localStorage.getItem('___savedProducts').split(',')];
      localStorage.setItem('___savedProducts', savedProducts);
      collection.get(product.id).save();
    }
  }

  return (
    <div
      onClick={handleClick}
      className={s.saveButton}
    >
      <div>
        <Icon
          name="saved"
          saved={product.saved}
          className={s.save}
        />
      </div>
      <div className={s.textContainer}>ADD TO FAVORIVE</div>
    </div>
  );
});
