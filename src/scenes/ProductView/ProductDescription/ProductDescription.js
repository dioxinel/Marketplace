import React from 'react';
import s from './ProductDescription.module.scss';
import { ProductImage } from './ProductImage';
import { ProductTextDescription } from './ProductTextDescription';


export function ProductDescription({product}) {
    return (
    <div key={product.id} className={s.productDescription}>
      <ProductImage product={product} />
      <ProductTextDescription product={product}/>
    </div>
    );
  }
