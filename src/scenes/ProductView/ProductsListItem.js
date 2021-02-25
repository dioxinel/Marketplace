import React from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { routes } from '../routes';
import s from './Product.module.scss';
import Icon from 'src/components/Icon'
import { useProductCollection } from 'src/stores/Products/ProductsCollection';
import { observer } from 'mobx-react';
import Skeleton from 'react-loading-skeleton';
import SaveProductBtn from 'src/components/Product/SaveProductBtn';


function ProductsListItem({item}) {
    const history = useHistory()
    const collection = useProductCollection()
    
    if(!item) {
        return (
            <div className={s.listItem}>
                <Skeleton height={212}/>
            </div>
        )
    }

    function handleClick(e) {
        const node = e.target.closest('svg');
        if(node) return;
        history.push(generatePath(routes.product, {
            productId: item.id,
        }))
    }


    let productPicture = 'https://argamak-sher.uz/wp-content/uploads/no-image.png'  
    try{if (item.photos.length !== 0 && item.photos[0]) {
        productPicture = item.photos[0]}}catch{}
  return (
    <div
        onClick={handleClick}
        key={item.id}
        className={s.NavLink}>
        <div className={s.listItem}>
            <img src={productPicture} alt={"description"} className={s.listItemImage}/>
            <SaveProductBtn item={item} />
            <div className={s.listItemTitle}>{item.title}</div>
            <div className={s.itemPrice}>{'$' + item.price}</div>
        </div>
    </div>
  );
}

export default observer(ProductsListItem);