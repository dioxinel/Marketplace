import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Api from 'src/api';
import { useStore } from 'src/stores/createStore';
import { generatePath, useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import Icon from 'src/components/Icon';
import s from './SearchProduct.module.scss';
import { KeywordField } from './components/KeywordField';

function SearchProduct() {
  const store = useStore((store) => store.searchProducts);
  const { keywords } = store.searchParams;
  const { location } = store.searchParams;
  const history = useHistory();

  function onSubmit() {
    if (!localStorage.getItem('___recentSearches')) {
      localStorage.setItem('___recentSearches', [keywords]);
    } else {
      const recentSearches = new Set([keywords, ...localStorage.getItem('___recentSearches').split(',')]);
      localStorage.setItem('___recentSearches', [...recentSearches]);
    }
    store.clearItems();
    store.fetch.run();
    history.push(routes.searchProducts);
  }

  function handleChangeLocation(e) {
    store.searchParams.setLocation(e.target.value);
  }

  return (
    <div className={s.formContainer}>
      <div className={s.searchForm}>
        <KeywordField location={location} />
        <div className={s.locationField}>
          <Icon name="location" />
          <input
            id="location"
            placeholder="Location"
            value={location}
            onChange={handleChangeLocation}
          />
        </div>
        <button onClick={onSubmit} id="submit" className={s.searchButton}>Search</button>
      </div>

    </div>
  );
}

export default observer(SearchProduct);
