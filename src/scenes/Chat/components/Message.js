import React from 'react';
import { useStore } from 'src/stores/createStore';
import s from '../Chat.module.scss';

export const Message = ({ cb, item }) => {
  const store = useStore();
  const { user } = store.viewer;
  let st;
  if (user.id == item.ownerId) {
    st = s.ownMessage;
  } else {
    st = s.notOwnMessage;
  }
  return (
    <div className={s.messageContainer}>
      <div ref={cb} className={st}>
        {item.text}
      </div>
    </div>
  );
};
