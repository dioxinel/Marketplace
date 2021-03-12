import { observer } from 'mobx-react';
import React from 'react';
import { useParams } from 'react-router';
import { useUserCollection } from 'src/stores/Users/UserCollection';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductsListItem from '../ProductsListItem';
import { UserProfileInfo } from './UserProfileInfo';
import s from './UserProducts.module.scss';

export const UserProducts = observer(() => {
  const { userId } = useParams();
  const collection = useUserCollection();
  collection.getUser.run(userId);
  const user = collection.collection.get(userId);
  if (user) {
    user.ownProducts.fetch.run();
    return (
      <div className={s.pageBody}>
        <UserProfileInfo user={user} />
        <ul className={s.productsList}>
          {user.ownProducts.items.map((item) => (
            <ProductsListItem item={item} key={item.id} />
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={s.pageBody}>
      <ClipLoader color="#349A89" loading={collection.getUser.run || user.ownProducts.fetch.isLoading} size={50} />
    </div>
  );
});
