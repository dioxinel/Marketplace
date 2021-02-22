import { observer } from 'mobx-react';
import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { ProductInfo } from './components/ProductInfo';
import { ProductImage } from '../ProductView/ProductDescription/compoonents/ProductImage';
import { UpdateDate } from '../ProductView/ProductDescription/compoonents/UpdateDate';
import { routes } from '../routes';
import { ChatInfo } from './components/ChatInfo';
import s from './InboxView.module.scss';

export const InboxItem = observer(({item, ...props}) => {
    const store = useStore((store) => store.chats)
    if(!item) {
        return (
            <div className={s.inboxItem} {...props}>
                <ChatInfo />
                <div className={s.line}></div>
                <ProductInfo />
                <div className={s.line}></div>
                <UpdateDate className={s.lastMessageTime}/>
            </div>
        )
    }
    const chat = store.getById(item.id)
    
  return (
        <Link 
            to={generatePath(routes.chat, { chatId: item.id })}
            className={s.inboxItem}
            {...props}
            >
            <ChatInfo fullName={chat.user.fullName} text={chat.message.text}/>
            <div className={s.line}></div>
            <ProductInfo photos={chat.product.photos} title={chat.product.title} price={chat.product.price}/>
            <div className={s.line}></div>
        <UpdateDate updated={chat.message.updatedAt} className={s.lastMessageTime}/>
        </Link>
  
  );
})

