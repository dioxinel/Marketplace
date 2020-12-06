import React from 'react';
import s from '../Product.module.scss';
import { AddItemBtn } from './AddItemBtn';

export function AddPhotos({addItem, photosLinkList}) {
  return (
          <div className={s.photosListContainer}>
            <ul className={s.photosList}>
              {photosLinkList.map(
                (link) => {return (
                  <li key={photosLinkList.indexOf(link)}>
                    <img 
                    src={link} 
                    alt={"Exist"}
                    className={s.photo}
                    />
                  </li>
                )})}
                <AddItemBtn addItem={addItem} photosLinkList={photosLinkList} />
            </ul>
            
            
            
          </div>   
  );
}


