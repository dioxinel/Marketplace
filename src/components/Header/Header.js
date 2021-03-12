import React from 'react';
import { useStore } from 'src/stores/createStore';
import { observer } from 'mobx-react';
import Api from 'src/api';
import { routes } from 'src/scenes/routes';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { DropDownMenu } from './DropDownMenu';
import Icon from '../Icon';
import s from './Header.module.scss';

function Header() {
  const store = useStore();

  if (store.viewer.isLoggedIn) {
    return (
      <div className={s.Header}>
        <Logo darkTheme />
        <div className={s.right}>
          <DropDownMenu />
          <Icon name="saved-dt" className={s.Like} />
        </div>
      </div>
    );
  }
  return (
    <div className={s.Header}>
      <Logo darkTheme />
      <div className={s.right}>
        <Link
          to={routes.login}
          className={s.logBtn}
        >
          Login
        </Link>
        <Link to={routes.savedProducts}>
          <Icon name="saved-dt" className={s.Like} />
        </Link>

      </div>
    </div>
  );
}

export default observer(Header);
