import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useStore } from 'src/stores/createStore';
import s from './../SearchProduct.module.scss';
import { FastSearch } from './FastSearch';
import { RecentSearches } from './RecentSearches';

export const DropDown = observer(({list, open, setOpen}) => {
  const store = useStore((store) => store.searchProducts.searchParams)
  const keywords = store.keywords
  return(
    <>
      { open && 
      <div className={s.dropDown} id={'dropDown'}>
      {keywords ? <FastSearch list={list} setOpen={setOpen}/>: <RecentSearches />}
    </div>}
    </>
    
  )
})

