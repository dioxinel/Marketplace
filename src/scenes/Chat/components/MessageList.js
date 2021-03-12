import { observer } from 'mobx-react';
import React, {
  Component, useCallback, useEffect, useRef, useState,
} from 'react';
import {
  AutoSizer, CellMeasurer, CellMeasurerCache, List,
} from 'react-virtualized';
import { useStore } from 'src/stores/createStore';
import { getSnapshot } from 'mobx-state-tree';
import Skeleton from 'react-loading-skeleton';
import s from '../Chat.module.scss';
import { Message } from './Message';

export const MessageList = observer(({ chat }) => {
  const cb = useCallback(() => {
    if (chat.messages.fetch.isLoading) return;
    if (chat.messages.messagesCount === chat.messages.items.length) return;
    setTimeout(() => { chat.messages.fetch.run(); }, 1000);
  });

  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 200,
  }));

  if (!chat.messages.items.length) {
    return (
      <div style={{ width: '100%', height: '57vh', fontSize: '57vh' }}>
        <Skeleton />
      </div>
    );
  }

  const rowRenderer = ({
    key, index, style, parent,
  }) => {
    const item = chat.messages.items[index];
    let callback;
    if (chat.messages.items.length === index + 1) {
      callback = cb;
    }
    return (
      <CellMeasurer
        cache={cache.current}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure, registerChild }) => (
          <div style={style} key={key} ref={registerChild} className={s.message}>
            <Message item={item} cb={callback} onLoad={measure} />
          </div>
        )}

      </CellMeasurer>
    );
  };
  return (
    <div className={s.list} style={{ width: '100%', height: '56vh' }}>
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            overscanRowCount={2}
            rowCount={chat.messages.items.length}
            rowRenderer={rowRenderer}
            className={s.messages}
            id="messageList"
          />
        )}

      </AutoSizer>
    </div>
  );
});
