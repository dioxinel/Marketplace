import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { generatePath, Link, Route } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { MessageList } from '../MessageList/MessageList';
import { routes } from '../routes';



export const InboxView = observer(() => {
  const chats = useStore((store) => store.chats);
  useEffect(() => {
    chats.fetch.run()
  }, [])
  return (
    <div>
      <aside>
        <ul>
          {chats.items.map((item) => {
          return(<Link 
            to={generatePath(routes.chat, { chatId: item.id })}
            key={item.id}
            >
            <li>{item.id}</li>
          </Link>
      )})}
        </ul>
      </aside>
      
      <main>
        <Route path={routes.chat} component={MessageList}></Route>
      </main>
    </div>
    
  );
})

