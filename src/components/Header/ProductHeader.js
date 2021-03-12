import React from 'react';
import { useStore } from 'src/stores/createStore';
import { observer } from 'mobx-react';
import Api from 'src/api';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import SearchProduct from 'src/scenes/ProductView/Search/SearchProduct';
import { Link } from 'react-router-dom';
import { DropDownMenu } from './DropDownMenu';
import { Logo } from './Logo';
import { SellButton } from './SellButton';
import Icon from '../Icon';
import s from './Header.module.scss';
import { LoginButton } from './components/LoginButton';

function ProductHeader() {
  const store = useStore();
  const history = useHistory();

  if (store.viewer.isLoggedIn) {
    return (
      <div>
        <div className={s.productHeader}>
          <div className={s.headerContainer}>
            <Logo darkTheme />
            <div className={s.right}>
              <Icon name="inboxIcon" onClick={() => history.push(routes.inbox)} />
              <SellButton />
              <DropDownMenu />
              <Link to={routes.savedProducts}>
                <Icon name="saved-dt" className={s.Like} />
              </Link>
            </div>
          </div>
          <SearchProduct />
        </div>
      </div>
    );
  }
  return (
    <div className={s.productHeader}>
      <div className={s.headerContainer}>
        <Logo />
        <div className={s.right}>
          <SellButton />
          <LoginButton />
          <Link to={routes.savedProducts}>
            <Icon name="saved-dt" className={s.Like} />
          </Link>
        </div>
      </div>
      <SearchProduct />
    </div>
  );
}

export default observer(ProductHeader);
