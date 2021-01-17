import React from 'react';
import s from './../../ProductDescription.module.scss';
import { UserAvatar } from 'src/components/User/UserAvatar';
import { Location } from '../Location';
import { observer } from 'mobx-react';
import { routes } from '../../../../routes';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import { generatePath, useHistory, useParams } from 'react-router';

export const ProductOwner = observer(() => {
  const { productId }= useParams();
  const collection = useProductCollection()
  const product = collection.collection.get(productId)
  const history = useHistory()
  
  function handleClick() {
    history.push(generatePath(routes.userProducts, {
      userId: product.owner.id + '',
    }))
  }

    return (
      <div className={s.productOwner}>
          <div className={s.avatarContainer}>
            <UserAvatar user={product.owner} className={s.avatar} />
          </div>
         <div 
            onClick={handleClick}  
            className={s.userName}>
            {product.owner && product.owner.fullName}
          </div>
          <Location className={s.location}/>
      </div>
    );
})
