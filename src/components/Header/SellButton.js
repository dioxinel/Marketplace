import React from 'react';
import s from './Header.module.scss';
import 'mobx-react-lite/batchingForReactDom';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';

export function SellButton() {
    const history = useHistory()

  function handleClick() {
   history.push(routes.newProduct)
  }
  return (
    <button onClick={handleClick} className={s.SellBtn}>SELL</button>
  )
}


