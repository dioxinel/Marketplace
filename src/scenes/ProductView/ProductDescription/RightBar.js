import s from './ProductDescription.module.scss';
import { observer } from 'mobx-react';
import React from 'react';
import { ProductOwner } from './ProductOwner';
import { SaveProduct } from './SaveProduct';

export const RightBar = observer(({product}) =>  {
    return (
      <div className={s.rightBar}>
         <ProductOwner />
         <SaveProduct />
      </div>
    );
    })
