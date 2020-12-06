import React from 'react';
import s from './Header.module.scss';
import 'mobx-react-lite/batchingForReactDom';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import Icon from '../Icon';

export function Logo() {
  const history = useHistory()

  function handleClick() {
   history.push(routes.home)
  }

  return (
    <div onClick={handleClick} className={s.left}>
          <Icon name={'logo'} className={s.Logo} />
    </div>
  )
}

