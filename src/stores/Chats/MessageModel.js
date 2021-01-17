import { types } from 'mobx-state-tree';

export const MessageModel = types.model('Message', {
  id: types.identifierNumber,
  chatId: types.number,
  ownerId: types.number,
  text: types.string,
  read: types.boolean,
  createdAt: types.string,
  updatedAt: types.string,

})