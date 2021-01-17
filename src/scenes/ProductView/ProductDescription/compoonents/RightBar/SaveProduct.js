import s from './../../ProductDescription.module.scss';
import { observer } from 'mobx-react';
import React from 'react';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import Icon from 'src/components/Icon';
import { useParams } from 'react-router';


export const SaveProduct = observer(() =>  {
  const { productId }= useParams();
  const collection = useProductCollection()
  const product = collection.collection.get(productId)
 
  function handleClick() {
    
    collection.saveProduct.run(product.id);
  }

  return (
    <div 
    onClick={handleClick}
    className={s.saveButton}
    >
        <div>
        <Icon 
          name={'saved'} 
          saved={product.saved} 
          className={s.save}
        />
        </div>
        <div className={s.textContainer}>ADD TO FAVORIVE</div>
    </div>
    );
  })
