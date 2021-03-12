import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useStore } from 'src/stores/createStore';
import Icon from '../Icon';
import s from './Error.module.scss';

export const ErrorMessage = observer(({ text }) => {
  const store = useStore();
  function handleClose() {
    store.auth.setError(false);
  }

  const customStyle = {
    overlay: { zIndex: 5 },
  };

  return (
    <>
      <Modal isOpen={store.auth.error} onRequestClose={handleClose} style={customStyle} className={s.errorMessage}>
        <div>{text}</div>
        <Icon name="cross" onClick={handleClose} className={s.close} />
      </Modal>
    </>
  );
});
