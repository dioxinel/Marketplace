import { observer } from 'mobx-react';
import React from 'react';
import { useParams } from 'react-router';
import { useUserCollection } from 'src/stores/Users/UserCollection';
import ProductsListItem from '../ProductsListItem';
import s from './UserProducts.module.scss';

export const UserProducts = observer(() => {
  const { userId }= useParams();
  const collection = useUserCollection()
  collection.getUser.run(userId)
  const user = collection.collection.get(userId)
  if(user) {
    user.ownProducts.fetch.run()
    return (
      <div className={s.pageBody}>
        <ul className={s.productsList}>
          {user.ownProducts.items.map((item) => {
            return (
              <ProductsListItem item={item} key={item.id}/>
            );
          })
          }
        </ul>
      </div>
    );
        }

    return (
      <div>
          UserProducts
      </div>
    );
  })
 