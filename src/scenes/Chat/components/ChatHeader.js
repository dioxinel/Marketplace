import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { UserAvatar } from 'src/components/User/UserAvatar';
import { ProductInfo } from './ProductInfo';
import s from '../Chat.module.scss';

export const ChatHeader = observer(() => {
  const { chatId } = useParams();
  const chat = useStore((store) => store.chats.getById(+chatId));
  useEffect(() => {
    if (chat) {
      chat.messages.fetch.run();
    }
  }, [chat]);

  if (!chat) {
    return (<div>...Loading</div>);
  }

  return (
    <div className={s.chatHeader}>
      <UserAvatar user={chat.user} containerClass={s.avatarContainer} className={s.avatar} />
      <p>{chat.user.fullName}</p>
      <ProductInfo product={chat.product} />
    </div>

  );
});
