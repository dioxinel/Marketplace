import React from 'react';
import { generatePath, useHistory } from 'react-router';
import Icon from 'src/components/Icon';
import { ProductImage } from 'src/scenes/ProductView/ProductDescription/compoonents/ProductImage';
import { routes } from 'src/scenes/routes';
import s from './../Chat.module.scss';

export const ProductInfo =({ product }) => {
    const history = useHistory()
  return (
    <div>
        <ProductImage photoList={product.photos} className={s.photo}/>
        <div>{'$' + product.price}</div>
        <div>{product.title}</div>
        <Icon name={'moveToProduct'} onClick={()=>history.push(generatePath(routes.product, { productId: product.id }))}/>
    </div>
    
  );
}
