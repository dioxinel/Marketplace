import React, { useEffect, useState } from 'react';

import { ChatHeader } from './components/ChatHeader';
import { useParams } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { observer } from 'mobx-react';
import s from './Chat.module.scss';
import {MessageList} from './components/MessageList';

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

    if (!chat) {
        return (<div>...Loading</div>)
    }


    function handleChange(evt) {
        setMessage(evt.target.value)
      }
    
      function handleSend() { 
        
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

  return (
      <div className={s.chat}>
        <ChatHeader />
        <MessageList chat={chat} />
        <main>
        <textarea id={'messageArea'} value={message} onChange={handleChange}>

        </textarea>
            <button onClick={handleSend}>Send</button>
        </main>
        
      </div>
  )
})

