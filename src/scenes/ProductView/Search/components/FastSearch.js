import React from 'react';
import s from '../SearchProduct.module.scss';
import { FastSearchItem } from './FastSearchItem';

export function FastSearch({ list, setOpen }) {
  return (
    <ul className={s.recentSearches} id="fastSearch">
      {!list.length ? <div className={s.noMatches}>No matches</div>
        : list.map((item, index) => {
          if (index >= 8) return;
          return (<FastSearchItem key={item.id} item={item} setOpen={setOpen} />);
        })}
    </ul>

  );
}
