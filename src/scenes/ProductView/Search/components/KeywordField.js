import React, { useEffect, useState } from 'react';
import Icon from 'src/components/Icon';
import Api from 'src/api';
import { useDebounce } from 'src/stores/utils';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores/createStore';
import { DropDown } from './DropDown';
import s from '../SearchProduct.module.scss';

export const KeywordField = observer(() => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  const store = useStore((store) => store.searchProducts);
  const { keywords } = store.searchParams;

  const debouncedSearchTerm = useDebounce(keywords, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      Api.Products.search({
        keywords,
      })
        .then((res) => { setList([...res.data]); });
    } else {
      setList([]);
    }
  },
  [debouncedSearchTerm]);

  function outerClickListener(e) {
    const node = e.target.closest('#dropDown');

    if (!node) {
      closeMenu();
    }
  }

  function closeMenu() {
    document.removeEventListener('click', outerClickListener);
    setOpen(false);
  }

  function openMenu() {
    document.addEventListener('click', outerClickListener);
    if (open) return closeMenu();
    setOpen(true);
  }

  function handleChange(e) {
    store.searchParams.setKeywords(e.target.value);
  }

  return (
    <div className={s.keywordsFieldContainer}>
      <div className={s.keywordsField}>
        <Icon name="search" />
        <input
          placeholder="Search products by name"
          value={keywords}
          id="keywords"
          autoComplete="off"
          onChange={handleChange}
          onClick={openMenu}
        />
      </div>
      <DropDown
        list={list}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
});
