import React from 'react';
import { generatePath, useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import { ProductImage } from '../../ProductDescription/compoonents/ProductImage';
import s from '../SearchProduct.module.scss';

export function FastSearchItem({ item, setOpen }) {
  const history = useHistory();
  function handleClick() {
    history.push(generatePath(routes.product, { productId: item.id }));
    setOpen(false);
  }
  return (
    <li key={item} onClick={handleClick} className={s.fastSearchItem}>
      <ProductImage photoList={item.photos} className={s.productImage} />
      <div className={s.textInfo}>
        <p className={s.productTitle}>{item.title}</p>
        <p className={s.itemPrice}>{`${'$'}${item.price}`}</p>
      </div>

    </li>

  );
}
