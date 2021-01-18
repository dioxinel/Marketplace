import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { generatePath, Link, Route, useParams } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { routes } from '../routes';

export const MessageList = observer(() => {
  const { chatId } = useParams()
  const [ message, setMessage ] = useState('')
  const chat = useStore((store) => store.chats.getById(+chatId));

  useEffect(() => {
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
    chat.sendMessage.run(message)
  }

  return (
    <div>
        <ul>
            {chat.messages.asList.map((item) => {
                return (<li key={item.id}>{item.text}</li>)
            })}
        </ul>
      <main>
        <textarea onChange={handleChange}>

        </textarea>
        <button onClick={handleSend}>Send</button>
      </main>
    </div>
    
  );
})

