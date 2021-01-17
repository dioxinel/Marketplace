import React from 'react';
import Icon from 'src/components/Icon';

import s from '../Product.module.scss';

export function AddItemBtn({handleChange}) {
  return (
          <div className={s.photosListItem}>
            <input type={'file'} onChange={handleChange} className={s.input} id={'file'}></input>
            <Icon name={'plus'} />
          </div>   
  );
}
