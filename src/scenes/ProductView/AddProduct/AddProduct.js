import React from 'react';
import { useHistory } from 'react-router';
import Api from 'src/api';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores/createStore';
import { routes } from '../../routes';
import AddProductForm from './AddProductForm';
import s from '../Product.module.scss';

function AddProduct() {
  const history = useHistory();
  const store = useStore();

  async function onSubmit({
    title,
    location,
    description,
    price,
  }) {
    const photos = store.setProductPhoto.photos.map((item) => item.link);
    // await Api.Products.add({
    //   title,
    //   location,
    //   description,
    //   photos,
    //   price});
    store.setProductPhoto.clearPhotos();
    console.log(store.setProductPhoto.photos);
    // history.push(routes.home);
  }
  return (
    <div className={s.pageBody}>
      <AddProductForm onSubmit={onSubmit} />
    </div>
  );
}

export default observer(AddProduct);
