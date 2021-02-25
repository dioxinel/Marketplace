import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { ProductImage } from 'src/scenes/ProductView/ProductDescription/compoonents/ProductImage';
import s from './../InboxView.module.scss';

export const ProductInfo = ({photos, title, price}) => {
  let showPhoto;
  if(photos) {
    showPhoto = (<ProductImage photoList={photos} className={s.photo}/>)
  }else{
    showPhoto = (<Skeleton width={47} height={47} className={s.photo} />)
  }
  return (
    <div className={s.productInfo}>
        {showPhoto}
        <div className={s.productTextInfo}>
          <div>{title || <Skeleton width={200}/>}</div>
          <div className={s.price}>{price || <Skeleton width={50}/>}</div>
        </div>
    </div>
  );
}

