import React from 'react';
import { UserAvatar } from 'src/components/User/UserAvatar';
import { observer } from 'mobx-react';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import { generatePath, useHistory, useParams } from 'react-router';
import ClipLoader from 'react-spinners/ClipLoader';
import { routes } from '../../../../routes';
import { Location } from '../Location';
import s from '../../ProductDescription.module.scss';

export const ProductOwner = observer(() => {
  const { productId } = useParams();
  const collection = useProductCollection();
  const product = collection.collection.get(productId);
  const history = useHistory();

  function handleClick() {
    history.push(generatePath(routes.userProducts, {
      userId: `${product.owner.id}`,
    }));
  }

  if (collection.getProduct.isLoading) {
    return (
      <div className={s.loading}>
        <div className={s.avatarContainer} />
        <div className={s.spine}>
          <ClipLoader color="#349A89" loading={collection.getProduct.isLoading} size={50} />
        </div>
      </div>
    );
  }
  return (
    <div className={s.productOwner}>
      <div className={s.avatarContainer}>
        <UserAvatar user={product.owner} className={s.avatar} />
      </div>
      <div
        onClick={handleClick}
        className={s.userName}
      >
        {product.owner && product.owner.fullName}
      </div>
      <Location className={s.location} />
    </div>
  );
});
