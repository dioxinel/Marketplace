import React from 'react';
import s from './Header.module.scss';
import Icon from '../Icon';
import { useStore } from 'src/stores/createStore';
import { UserAvatar } from '../User/UserAvatar';
import { observer } from 'mobx-react';
import Api from 'src/api';
import 'mobx-react-lite/batchingForReactDom';
import { SellButton } from './SellButton';
import { Logo } from './Logo';

function Header() {
  const store = useStore();
  const user = store.viewer.user;

  function handleLogout() {
    Api.Auth.logout();
    store.viewer.setViewer(null);
    store.viewer.setIsLoggedIn(false);
  }
  if (store.viewer.isLoggedIn) {
    return (
      <div className={s.Header}>
        <Logo />
        <div className={s.right}>
          <SellButton />
          <UserAvatar user={user} className={s.avatar}/>
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
      <Logo />
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
