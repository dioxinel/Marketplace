import { getSnapshot, types } from 'mobx-state-tree';
import Api from 'src/api';
import { ChatSchema } from '../schemas';
import { UserModel } from '../Users/UserModel'
import { asyncModel, safeReference } from '../utils';


export const ProductModel = types.model('ProductModel', {
  id: types.identifierNumber,
  description: types.maybeNull(types.string),
  ownerId: types.number,
  title: types.string,
  photos: types.maybeNull(types.array(types.string)),
  location: types.string,
  price: types.number,
  saved: false,
  createdAt: types.string,
  updatedAt: types.string,

  owner: types.maybe(safeReference(UserModel)),

  createChat: asyncModel(createChat, false),
}).actions((store) => ({
  save() {
    store.saved = !store.saved;
  }
})
)


function createChat(message) {
  return async function createChatFlow(flow, store) {
    let chatId;
    try {
      flow.start()

      const res = await Api.Chats.createChat(message, store.id)
      chatId = res.data.id;
      res.data.participants = [getSnapshot(store.owner)]
      
      flow.merge(res.data, ChatSchema)

      flow.end()
    } catch(err) {
      flow.error(err)

      throw err;
    }
    return chatId;
  }
}

