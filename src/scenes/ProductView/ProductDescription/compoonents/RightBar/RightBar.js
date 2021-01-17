import s from './../../ProductDescription.module.scss';
import { observer } from 'mobx-react';
import React from 'react';
import { ProductOwner } from './ProductOwner';
import { SaveProduct } from './SaveProduct';
import { CreateChatWithSellerBtn } from './CreateChatWithSeller/CreateChatWithSellerBtn';

export const RightBar = observer(() =>  {
    return (
      <div className={s.rightBar}>
         <ProductOwner />
         <CreateChatWithSellerBtn />
         <SaveProduct />
      </div>
    );
    })
