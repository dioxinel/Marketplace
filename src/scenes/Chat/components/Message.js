import React from 'react';
import s from './../Chat.module.scss';
import { useStore } from 'src/stores/createStore';

export const Message = ({ cb, item }) => {
  const store = useStore();
  const user = store.viewer.user;
  let st; 
  if (user.id == item.ownerId) {
    st = s.ownMessage
  } else {
    st = s.notOwnMessage
  }
    return (
      <div>
        <div ref={cb} className={st}>
          {item.text}
        </div>
      </div>
    );
  }
