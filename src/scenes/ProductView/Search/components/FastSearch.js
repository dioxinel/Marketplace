import React from 'react';
import s from './../SearchProduct.module.scss';
import { FastSearchItem } from './FastSearchItem';

export function FastSearch({list, setOpen}) {
  return (
    <ul className={s.recentSearches} id={'fastSearch'}>
      { list.map((item)=> {
        return(<FastSearchItem key={item.id} item={item} setOpen={setOpen} />)
      })}
    </ul>
    
  );
}