import { observer } from 'mobx-react';
import React from 'react';
import { useParams } from 'react-router';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import { ProductDescription } from './compoonents/ProductDescription';
import { RightBar } from './compoonents/RightBar/RightBar';
import s from './ProductDescription.module.scss';

export const ProductView = observer(() => {
  const { productId } = useParams();
  const collection = useProductCollection();
  collection.getProduct.run(productId);
  const product = collection.collection.get(productId);
  if (product) {
    return (
      <div className={s.productView}>
        <ProductDescription product={product} />
        <RightBar product={product} />
      </div>
    );
  }
});
