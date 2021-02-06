import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { ProductInfo } from './ProductInfo';
import { UserInfo } from './UserInfo';
import s from './../Chat.module.scss';

export const ChatHeader = observer(() => {
  const { chatId } = useParams()
  const chat = useStore((store) => store.chats.getById(+chatId));
  useEffect(() => {
      if(chat) {
        chat.messages.fetch.run()
      }
  }, [chat])

  if (!chat) {
      return (<div>...Loading</div>)
  }
  
  return (
    <div className={s.chatHeader}>
      <UserInfo user={chat.user}/>
      <ProductInfo product={chat.product} />
    </div>
    
  );
})

