import React from 'react';
import Icon from 'src/components/Icon';
import s from './ProductDescription.module.scss';
import { UpdateDate } from './UpdateDate';


export function ProductTextDescription({product}) {
    return (
    <div>
        <div className={s.firstLineProductView}>
            <div className={s.viewTitle}>{product.title}</div>
            <UpdateDate updated={product.updatedAt} className={s.date}/>
        </div>
        <div className={s.secondLineProductView}>
            <Icon name={"location"} />
            <div className={s.location}>{product.location}</div>
        </div>
        <div className={s.itemPriceContainer}>
            <div className={s.itemPrice}>{'$' + product.price}</div>
        </div>
        <div className={s.description}>{product.description}</div>
    </div>
    );
  }
