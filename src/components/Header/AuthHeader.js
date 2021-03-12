import React from 'react';
import { useStore } from 'src/stores/createStore';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import Icon from '../Icon';
import s from './Header.module.scss';

function AuthHeader() {
  return (
    <div className={s.authHeader}>
      <Logo darkTheme={false} />
      <div className={s.right}>
        <button className={s.SellBtn}>SELL</button>
        <Link
          to={routes.login}
          className={s.logBtn}
        >
          Login
        </Link>
        <Link to={routes.savedProducts}>
          <Icon name="saved" className={s.Like} />
        </Link>

      </div>
    </div>
  );
}

export default observer(AuthHeader);
