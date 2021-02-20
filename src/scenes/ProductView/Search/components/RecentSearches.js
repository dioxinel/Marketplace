import React, { useEffect, useState } from 'react';
import Icon from 'src/components/Icon';
import { useStore } from 'src/stores/createStore';
import s from './../SearchProduct.module.scss';

export function RecentSearches() {
  const [ list, setList ] = useState([])
  const store = useStore()

  useEffect(()=>{
    if(!localStorage.getItem('___recentSearches')) {
      return
    }
    setList([...localStorage.getItem('___recentSearches').split(',')])
  }, [])


  function handleClick(e) {
    const node = e.target.closest('li');
    if (!node) {
      return;
    }
    store.searchProducts.searchParams.setKeywords(node.lastChild.innerHTML)
  }

  function clearRecentSearches() {
    localStorage.removeItem('___recentSearches')
    setList([])
  }

  return (
    <ul className={s.recentSearches} id={'recentSearches'} onClick={handleClick}>
      <div className={s.recentSearchesHeader}>
        <p className={s.title}>Recent searches</p>
        <p className={s.clearAll} onClick={clearRecentSearches}>Clear All</p>
      </div>
      { !!list.length && list.map((item)=> {
        return(<li key={item} data={item} className={s.recentSearchesItem}>
          <Icon name={'search2'} />
          <p>{item}</p>
        </li>)
      })}
    </ul>
    
  );
}


