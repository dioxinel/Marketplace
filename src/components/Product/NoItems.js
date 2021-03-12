import React from 'react';
import s from './ProductComponents.module.scss';

export function NoItems({ text }) {
  return (
    <div className={s.noItems}>
      <img src="https://www.denmakers.in/img/no-results.png" alt="No matches" />
      <div>{text}</div>
    </div>

  );
}
