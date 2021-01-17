import React from 'react';
import s from '../Product.module.scss';
import AddProductForm from './AddProductForm';
import { useHistory } from 'react-router';
import Api from 'src/api';
import { routes } from '../../routes';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores/createStore';

function AddProduct() {
    const history = useHistory();
    const store = useStore()
  // async function addImageLink(linkToRemove) {
  //   if(linkToRemove) {
  //     if(imageLink.length === 1) {
  //       return setImageLink([])
  //     }
  //     return setImageLink([imageLink.splice(linkToRemove, 1)]) 
  //   }

  //   const button = document.querySelector('#submit');
  //   button.disabled = 'true'

  //   const data = new FormData()
  //   const imageFile = document.querySelector('#file');
  //   data.append('image', imageFile.files[0]);
  //   const res = await Api.Products.uploadImage(data)
  //   console.log(res.data)
  //   setImageLink([ ...imageLink, res.data])

  //   imageFile.value = '';
  //   button.disabled = null
  // }
    async function onSubmit({ 
      title, 
      location, 
      description,
      price
      }) {
      const photos = store.setProductPhoto.link; 
      await Api.Products.add({ 
        title, 
        location, 
        description,
        photos,
        price});
      history.push(routes.home);
    }
  return (
    <div className={s.pageBody}>
      <AddProductForm onSubmit={onSubmit} />
    </div>
  );
}

export default observer(AddProduct);
