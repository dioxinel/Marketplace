import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { ChatCollectionSchema } from '../schemas';
import { asyncModel } from '../utils';
import { ChatModel } from './ChatModel';

export const ChatStore = types.model('ChatStore', {
  items: types.array(types.reference(ChatModel)),

  fetch: asyncModel(fetchChats),
})

  .views((store) => ({
    getById(id) {
      return store.items.find((i) => i.id === id);
    },
  }))

  .actions((store) => ({
    runInAction(cb) {
      cb(store);
    },

    handleMessage(message) {
      if (message.type === 'ADD') {
        const chat = store.getById(message.message.chatId);
      }
      if (typeof chat !== undefined) {
        chat.addMessage(message.message);
      }
    },

  }));

function fetchChats() {
  return async function fetchChatsFlow(flow, store) {
    const res = await Api.Chats.getList();

    const result = flow.merge(res.data, ChatCollectionSchema);

    store.runInAction((self) => {
      self.items = result;
    });
  };
}
