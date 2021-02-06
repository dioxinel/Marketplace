import { observer } from 'mobx-react';
import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import Icon from 'src/components/Icon';
import { useStore } from 'src/stores/createStore';
import { ProductImage } from '../ProductView/ProductDescription/compoonents/ProductImage';
import { UpdateDate } from '../ProductView/ProductDescription/compoonents/UpdateDate';
import { routes } from '../routes';
import s from './InboxView.module.scss';

export const InboxItem = observer(({item, ...props}) => {
    const store = useStore((store) => store.chats)
    const chat = store.getById(item.id)
  return (
        <Link 
            to={generatePath(routes.chat, { chatId: item.id })}
            className={s.inboxItem}
            {...props}
            >
            <div>
                <div className={s.userName}>{chat.user.fullName}</div>
                <div className={s.inboxItemMessage}>
                    <Icon name='inboxChatIcon' className={s.inboxChatIcon} />
                    <div>{chat.message.text}</div>
                </div>   
            </div>
            <div className={s.line}></div>
            <div className={s.productInfo}>
                <ProductImage photoList={chat.product.photos} className={s.photo}/>
                <div className={s.productTextInfo}>
                    <div>{chat.product.title}</div>
                    <div className={s.price}>{'$' + chat.product.price}</div>
                </div>
            </div>
            <div className={s.line}></div>
        <UpdateDate updated={chat.message.updatedAt} className={s.lastMessageTime}/>
          </Link>
  
  );
})

