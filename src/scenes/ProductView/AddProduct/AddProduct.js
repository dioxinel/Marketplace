import React, { useState } from 'react';
import s from '../Product.module.scss';
import AddProductForm from './AddProductForm';
import { useHistory } from 'react-router';
import Api from 'src/api';
import { routes } from '../../routes';

function AddProduct() {
    const history = useHistory();
    const [photosLinkList, setPhotosLinkList] = useState([]);

    function addPhoto(list) {
      setPhotosLinkList(list)
    }

    async function onSubmit({ 
        title, 
        location, 
        description,
        price}) {
        const photos = photosLinkList;
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
      <AddProductForm onSubmit={onSubmit} addPhoto={addPhoto} photosLinkList={photosLinkList}/>
    </div>
  );
}

export default AddProduct;
