import React from 'react';
import s from './Header.module.scss';
import Icon from '../Icon';
import { useStore } from 'src/stores/createStore';
import { observer } from 'mobx-react';
import Api from 'src/api';
import 'mobx-react-lite/batchingForReactDom';
import { getInitials } from './getInitials';

function Header() {
  const store = useStore();
  const user = store.viewer.user;

  function handleLogout() {
    Api.Auth.logout();
    store.viewer.setViewer(null);
    store.viewer.setIsLoggedIn(false);
  }
  if (store.viewer.isLoggedIn) {
    const userInitial = getInitials(user.fullName.split(' '));

    return (
      <div className={s.Header}>
        <div className={s.left}>
          <Icon name={'logo'} className={s.Logo} />
        </div>
        <div className={s.right}>
          <button className={s.SellBtn}>SELL</button>
          <div className={s.avatar}>{userInitial}</div>
          <a
            className={s.LogBtn}
            onClick={handleLogout}
            href={'/auth/login'}
          >
            LOGOUT
          </a>
          <Icon name={'saved'} className={s.Like} />
        </div>
      </div>
    );
  }
  return (
    <div className={s.Header}>
      <div className={s.left}>
        <Icon name={'logo'} className={s.Logo} />
      </div>
      <div className={s.right}>
        <button className={s.SellBtn}>SELL</button>
        <a className={s.LogBtn} href={'/auth/login'}>
          LOGIN
        </a>
        <Icon name={'saved'} className={s.Like} />
      </div>
    </div>
  );
}

export default observer(Header);
