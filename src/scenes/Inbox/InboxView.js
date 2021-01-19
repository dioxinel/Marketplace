import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { MessageList } from '../MessageList/MessageList';
import { routes } from '../routes';
import { InboxItem } from './InboxItem';



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
          return(<InboxItem item={item} key={item.id} />
      )})}
        </ul>
      </aside>
      
      <main>
        <Route path={routes.chat} component={MessageList}></Route>
      </main>
    </div>
    
  );
})

