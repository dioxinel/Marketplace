import React, { useEffect, useState } from 'react';

import { ChatHeader } from './components/ChatHeader';
import { useParams } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { observer } from 'mobx-react';
import s from './Chat.module.scss';
import {MessageList} from './components/MessageList';
import Icon from 'src/components/Icon';

export const Chat = observer(() => {
    const { chatId } = useParams()
    const chat = useStore((store) => store.chats.getById(+chatId));
    const [ message, setMessage ] = useState('')
    const store = useStore()

    useEffect(()=>{
      if(chat) {
        chat.messages.fetch.run()
      }
    }, [chat])

    if (!chat.messages) {
        return (<div>...Loading</div>)
    }

    function handleChange(evt) {
        setMessage(evt.target.value)
      }
    
      function handleSend(e) {
        if (e.key === 'Enter') {
          chat.messages.addMessage({
            id: Math.random(),
            chatId: chat.id,
            ownerId: store.viewer.user.id,
            text: message,
            read: false,
            createdAt: new Date() + '',
            updatedAt: new Date() + ''
          })   
          chat.sendMessage.run(message)
          setMessage('') 
        }
      }

  return (
      <div className={s.chat}>
        <ChatHeader />
        <MessageList chat={chat} />
        <main>
          <div className={s.messageInput}>
            <input
              id={'messageArea'} 
              value={message} 
              onChange={handleChange}
              placeholder={'Type your message here...'}
              onKeyDown={handleSend}
              > 
            </input>
          <div>
            <Icon name={'smiley'} />
            <Icon name={'clip'} className={s.clip}/>
          </div>         
        </div>
        </main>       
      </div>
  )
})

