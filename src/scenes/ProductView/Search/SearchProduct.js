import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Api from 'src/api';
import 'mobx-react-lite/batchingForReactDom';
import { useStore } from 'src/stores/createStore';
import { generatePath, useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import s from './SearchProduct.module.scss';
import Icon from 'src/components/Icon';
import { KeywordField } from './components/KeywordField';


function SearchProduct() {
  const store = useStore((store) => {return store.searchProducts})
  const keywords = store.searchParams.keywords;
  const location = store.searchParams.location;
  const history = useHistory()

  function onSubmit() {
    if(!localStorage.getItem('___recentSearches')) {
      localStorage.setItem('___recentSearches', [keywords])
    } else {
      const recentSearches = new Set ([keywords, ...localStorage.getItem('___recentSearches').split(',')])
      localStorage.setItem('___recentSearches', [...recentSearches])
    }
    store.fetch.run()
    history.push(routes.searchProducts)
  }

  function handleChangeLocation(e) {
    store.searchParams.setLocation(e.target.value)
  }

  return (
    <div className={s.formContainer}>
        <div className={s.searchForm}>
          <KeywordField location={location} />
          <div className={s.locationField}>
            <Icon name={'location'} />
            <input
              id={"location"}
              placeholder={'Location'}
              value={location}
              onChange={handleChangeLocation}
            />
          </div>
          <button onClick={onSubmit} id={'submit'} className={s.searchButton}>Search</button>
        </div>
        
    </div>
  );
}

export default observer(SearchProduct);
