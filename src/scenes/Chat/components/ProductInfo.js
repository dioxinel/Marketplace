import React from 'react';
import { generatePath, useHistory } from 'react-router';
import Icon from 'src/components/Icon';
import { ProductImage } from 'src/scenes/ProductView/ProductDescription/compoonents/ProductImage';
import { routes } from 'src/scenes/routes';
import s from './../Chat.module.scss';

export const ProductInfo =({ product }) => {
    const history = useHistory()
  return (
    <div className={s.productInfo}>
      <div className={s.productInfoContainer}>
        <ProductImage photoList={product.photos} className={s.photo}/>
        <div>
          <div>{product.title}</div>
          <div className={s.price}>{'$' + product.price}</div>
        </div>
      </div>
        
        
        <Icon name={'moveToProduct'} onClick={()=>history.push(generatePath(routes.product, { productId: product.id }))}/>
    </div>
    
  );
}
