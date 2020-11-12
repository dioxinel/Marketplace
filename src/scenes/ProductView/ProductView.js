
import { observer } from 'mobx-react';
import React from 'react';
import { useParams } from 'react-router';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';


export const ProductView = observer(() => {
  const { productId }= useParams();
  const collection = useProductCollection()
  collection.getProduct.run(productId)
  const product = collection.collection.get(productId)
  if (product) {
    return (
    <div key={product.id}>{product.title}
      <div>{product.description}</div>
      <div>{product.owner && product.owner.fullName}</div>
      <img src={product.photos[0]} alt={"a"}/>
    </div>
    );
  }
  return <div>Not found</div>;
})
