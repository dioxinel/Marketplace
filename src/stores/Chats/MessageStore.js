import { getParent, getRoot, getSnapshot, types } from 'mobx-state-tree';
import Api from 'src/api';
import { MessageCollectionSchema, MessageSchema } from '../schemas';
import { asyncModel } from '../utils';
import { MessageModel } from './MessageModel';

export const MessageStore = types.model('MessageStore', {
  items: types.array(types.reference(MessageModel)),

  fetch: asyncModel(fetchMessages),
  messagesCount: types.optional(types.number, 10)
})
.views(store => ({
    get asList() {
        return store.items.slice().reverse()
    },

    get chatId() {
        return getParent(store).id;
    }
    

  }))
.actions(store => ({
    addMessage(message) {
      const result = getRoot(store).entities.normalize(message, MessageSchema)

      store.items.unshift(result)
    },

   setMessagesCount(num) {
    store.messagesCount = num;
   },

    setItems(value) {
      store.items = value
    }

  }))


function fetchMessages() {
    return async function fetchMessagesFlow(flow, store) {
      let lastItemId;
      try {
        lastItemId = store.items[store.items.length - 1].id;
        
      } catch {
        
      }finally {
        const res = await Api.Chats.getMessages(store.chatId, lastItemId)

        const result = flow.merge(res.data, MessageCollectionSchema);
        
        if(store.items.length) {
          if(store.items[0].id === result[0]){
            return
          }
        }
        store.setItems([...store.items, ...result]);
        if (result.length !== 20) {
          store.setMessagesCount(store.items.length)
          return
        }

        store.setMessagesCount(store.messagesCount + 20)
      }
        
    }
}

