import React from 'react';
import s from './Product.module.scss';
import AddProductForm from './AddProductForm';
import { useHistory } from 'react-router';
import Api from 'src/api';
import { routes } from '../routes';

function AddProduct() {
    const history = useHistory();
  
    async function onSubmit({ 
        title, 
        location, 
        description,
        photos = [],
        price}) {
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
      <AddProductForm onSubmit={onSubmit}/>
    </div>
  );
}

export default AddProduct;
