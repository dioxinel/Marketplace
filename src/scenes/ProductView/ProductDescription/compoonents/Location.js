import { observer } from 'mobx-react';
import React from 'react';
import { useParams } from 'react-router';
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import s from './../ProductDescription.module.scss';


export const Location = observer(({...props}) => {
    const { productId }= useParams();
    const collection = useProductCollection()
    const product = collection.collection.get(productId)
    try {
        return (
            <div {...props}>
                {product.owner.location || product.location}
            </div>
            );  
    } catch (error) {
        return (
            <div {...props}>
                {"Loading"}
            </div>
            );
    }
})