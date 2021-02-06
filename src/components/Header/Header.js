import React from 'react';
import s from './Header.module.scss';
import Icon from '../Icon';
import { useStore } from 'src/stores/createStore';

import { observer } from 'mobx-react';
import Api from 'src/api';
import 'mobx-react-lite/batchingForReactDom';
import { Logo } from './Logo';
import { routes } from 'src/scenes/routes';
import { DropDownMenu } from './DropDownMenu';
import { Link } from 'react-router-dom';

function Header() {
  const store = useStore();

  if (store.viewer.isLoggedIn) {
    return (
      <div className={s.Header}>
        <Logo darkTheme={true}/>
        <div className={s.right}>
          <DropDownMenu />
          <Icon name={'saved-dt'} className={s.Like} />
        </div>
      </div>
    );
  }
  return (
    <div className={s.Header}>
      <Logo darkTheme={true} />
      <div className={s.right}>
        <Link 
          to={routes.login}
          className={s.logBtn}
          >
          Login
        </Link>
        <Icon name={'saved-dt'} className={s.Like} />
      </div>
  </div>
  );
}

export default observer(Header);
