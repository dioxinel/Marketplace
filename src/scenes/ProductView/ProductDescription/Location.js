import { observer } from 'mobx-react';
import React from 'react';
import { useParams } from 'react-router';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import s from './ProductDescription.module.scss';


export const Location = observer(() => {
    const { productId }= useParams();
    const collection = useProductCollection()
    const product = collection.collection.get(productId)
    try {
        return (
            <div className={s.location}>
                {product.owner.location}
            </div>
            );  
    } catch (error) {
        return (
            <div className={s.location}>
                {"Loading"}
            </div>
            );
    }
})