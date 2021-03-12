import React from 'react';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import s from './Header.module.scss';

export function SellButton() {
  const history = useHistory();

  function handleClick() {
    history.push(routes.newProduct);
  }
  return (
    <button onClick={handleClick} className={s.SellBtn}>SELL</button>
  );
}
