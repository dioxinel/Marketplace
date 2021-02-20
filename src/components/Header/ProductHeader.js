import React from 'react';
import s from './Header.module.scss';
import Icon from '../Icon';
import { useStore } from 'src/stores/createStore';
import { observer } from 'mobx-react';
import Api from 'src/api';
import 'mobx-react-lite/batchingForReactDom';
import { SellButton } from './SellButton';
import { Logo } from './Logo';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import SearchProduct from 'src/scenes/ProductView/Search/SearchProduct';
import { DropDownMenu } from './DropDownMenu';
import { Link } from 'react-router-dom';

function ProductHeader() {
  const store = useStore();
  const history = useHistory()

  if (store.viewer.isLoggedIn) {
    return (
    <div>
      <div className={s.productHeader}>
        <div className={s.headerContainer}>
          <Logo darkTheme={true}/>
          <div className={s.right}>
            <Icon name='inboxIcon' onClick={()=>history.push(routes.inbox)}/>
            <SellButton />
            <DropDownMenu />
            <Icon name={'saved-dt'} className={s.Like} />
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
          <button className={s.SellBtn}>SELL</button>
          <Link 
          to={routes.login}
          className={s.logBtn}
          >
          Login
        </Link>
          <Icon name={'saved'} className={s.Like} />
        </div>
      </div>
      <SearchProduct />
    </div>
  );
}

export default observer(ProductHeader);
