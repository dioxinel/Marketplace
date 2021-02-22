import { observer } from 'mobx-react';
import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, List } from 'react-virtualized';
import { Message } from './Message';
import s from './../Chat.module.scss';
import { useStore } from 'src/stores/createStore';
import { getSnapshot } from 'mobx-state-tree';
import Skeleton from 'react-loading-skeleton';


export const MessageList = observer(({ chat }) => {
  let promiseResolve;
  function loadMoreRows() {
    chat.messages.fetch.run()
    return new Promise((resolve, reject) => {
      promiseResolve = resolve;
    });
  }

  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 200,
  }))

  if(!chat.messages.items.length) {
    return (
      <div style={{ width: '100%', height: '57vh', fontSize: '57vh' }}>
        <Skeleton/>
      </div>)
  }

  

  const rowRenderer = ({ key, index, style, parent }) => {
    const item = chat.messages.items[index]
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
            <Message item={item} onLoad={measure}/>
        </div>
        )}
      </CellMeasurer>
    )}
  return (
    <InfiniteLoader
        isRowLoaded={({index})=>{ !!chat.messages.items[index]}}
        loadMoreRows={loadMoreRows}
        rowCount={10000000}
        threshold={2}
      >
        {({ onRowsRendered, registerChild }) => (
          <div className={s.list} style={{ width: '100%', height: '56vh' }}>
          <AutoSizer>
          {({ width, height }) => {
              return (
                <List
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  width={width} 
                  height={height} 
                  rowHeight={cache.current.rowHeight}
                  deferredMeasurementCache={cache.current}
                  overscanRowCount={2}
                  rowCount={chat.messages.items.length} 
                  rowRenderer={rowRenderer}
                  className={s.messages}
                  id={'messageList'}
            />
              )}}
            
            </AutoSizer>
          </div>
        )}
      </InfiniteLoader>
  )
})


