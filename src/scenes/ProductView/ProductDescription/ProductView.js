import { observer } from 'mobx-react';
import React from 'react';
import { useParams } from 'react-router';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import { ProductDescription } from './ProductDescription';


export const ProductView = observer(() => {
  const { productId }= useParams();
  const collection = useProductCollection()
  collection.getProduct.run(productId)
  const product = collection.collection.get(productId)
  if (product) {
    return (
    <ProductDescription product={product} />
    );
  }
  return <div>Not found</div>;
})
