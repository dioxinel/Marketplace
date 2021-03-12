import { observer } from 'mobx-react';
import React from 'react';
import s from '../../ProductDescription.module.scss';
import { ProductOwner } from './ProductOwner';
import { SaveProduct } from './SaveProduct';
import { CreateChatWithSellerBtn } from './CreateChatWithSeller/CreateChatWithSellerBtn';

export const RightBar = observer(() => (
  <div className={s.rightBar}>
    <ProductOwner />
    <CreateChatWithSellerBtn />
    <SaveProduct />
  </div>
));
