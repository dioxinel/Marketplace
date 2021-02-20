import React from 'react';
import s from './../SearchProduct.module.scss';
import Icon from 'src/components/Icon';

export const ChoseCategory = () => {
  return (
    <div className={s.choseCategory}>
      <Icon name={'choseCategory'} />
      <p>Chose Category</p>
      <Icon name={'choseCategory2'} /> 
    </div>
  );
}


