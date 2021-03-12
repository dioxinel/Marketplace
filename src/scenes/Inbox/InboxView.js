import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { AutoSizer, List } from 'react-virtualized';
import s from './InboxView.module.scss';
import { routes } from '../routes';
import { InboxItem } from './InboxItem';
import { Chat } from '../Chat/Chat';

export const InboxView = observer(() => {
  const chats = useStore((store) => store.chats);
  useEffect(() => {
    chats.fetch.run();
  }, []);
  if (chats.items.length === 0) {
    return (
      <div className={s.inboxView}>
        <div>
          <aside className={s.aside}>
            <div style={{ width: '100%', height: '76vh' }}>
              <AutoSizer>
                {({ width, height }) => (
               <List
                  width={width}
                  height={height}
                  rowHeight={107}
                  rowCount={10}
                  className={s.inboxList}
                  rowRenderer={
              ({
                key, index, style, parent,
              }) => (<InboxItem key={key} style={style} />)
            }
                />
             )}
              </AutoSizer>
            </div>
          </aside>
        </div>
      </div>

    );
  }
  return (
    <div className={s.inboxView}>
      <div>
        <aside className={s.aside}>
          <div style={{ width: '100%', height: '76vh' }}>
            <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width}
                  height={height}
                  rowHeight={107}
                  rowCount={chats.items.length}
                  className={s.inboxList}
                  rowRenderer={
              ({
                key, index, style, parent,
              }) => {
                const item = chats.items[index];
                return (<InboxItem item={item} key={key} style={style} />);
              }
            }
                />
              )}
            </AutoSizer>
          </div>
        </aside>
      </div>

      <main className={s.chatContainer}>
        <Route path={routes.chat} component={Chat} />
      </main>
    </div>

  );
});
