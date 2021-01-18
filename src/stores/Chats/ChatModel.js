import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { ProductModel } from '../Products/ProductModel';
import { MessageSchema } from '../schemas';
import { UserModel } from '../Users/UserModel';
import { asyncModel } from '../utils';
import { MessageModel } from './MessageModel';
import { MessageStore } from './MessageStore';

export const ChatModel = types.model('Chat', {
  id: types.identifierNumber,
  productId: types.number,
  ownerId: types.number,
  createdAt: types.string,
  updatedAt: types.string,
  message: types.reference(MessageModel),
  product: types.reference(ProductModel),

  user: types.reference(UserModel),
  messages: types.optional(MessageStore, {}),
  sendMessage: asyncModel(sendMessage),
})

.preProcessSnapshot((snapshot) => {
  return {
    ...snapshot,
      product: snapshot.product || snapshot.productId,
      participants: undefined,
      user: snapshot.participants[0]
  }
})

function sendMessage(text) {
  return async function sendMessageFlow(flow, store) {
    const res = await Api.Chats.sendMessage(store.id, text)

    const result = flow.merge(res.data, MessageSchema)
  }
}