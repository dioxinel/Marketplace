import React from 'react';
import s from './ProductDescription.module.scss';


export function ProductImage({product}) {
    return (
      <div className={s.productImage}>
        <img 
        src={product.photos[0]} 
        alt={"Exist"} 
        />
      </div>
    );
  }
