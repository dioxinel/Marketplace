import { observer } from 'mobx-react';
import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import { Message } from './Message';
import s from './../Chat.module.scss';
import { useStore } from 'src/stores/createStore';
import { getSnapshot } from 'mobx-state-tree';


export const MessageList = observer(({ chat }) => {

  const [list, setList] = useState(false)

  
  const cb = useCallback(() => {
    if(chat.messages.fetch.isLoading)return;
    console.log(chat.messages.messagesCount === chat.messages.items.length)
    if(chat.messages.messagesCount === chat.messages.items.length)return;
    setTimeout(()=>{chat.messages.fetch.run()}, 1000)
  })


  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 200,
  }))

  function reRender() {
    setTimeout(()=>{setList("1")}, 100)
  }

  const rowRenderer = ({ key, index, style, parent }) => {
    const item = chat.messages.items[index]
    
    if ( chat.messages.items.length === index + 1) {
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
            <Message item={item} cb={cb} onLoad={measure}/>
          </div>
        )}
          
      </CellMeasurer>
      )
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
            <Message item={item} onLoad={measure}/>
        </div>
        )}
      </CellMeasurer>
    )}
    return (
      <div className={s.list}>
        <AutoSizer>
        {({ width, height }) => {
            return (
              <List
                width={width} 
                height={height} 
                rowHeight={cache.current.rowHeight}
                deferredMeasurementCache={cache.current}
                overscanRowCount={2}
                rowCount={chat.messages.items.length} 
                rowRenderer={rowRenderer}
          />
            )}}
          
        </AutoSizer>
        
      </div>
        );
        })
        