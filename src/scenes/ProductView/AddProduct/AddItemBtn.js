import React from 'react';
import Icon from 'src/components/Icon';

import s from '../Product.module.scss';

export function AddItemBtn({addItem, photosLinkList}) {
  function handleClick() {
    const newLink = prompt('Enter photos link')
    if (!newLink) return;
    addItem([...photosLinkList, newLink])
}
  return (
          <div onClick={handleClick} className={s.photosListItem}>
            <Icon name={'plus'} />
          </div>   
  );
}
