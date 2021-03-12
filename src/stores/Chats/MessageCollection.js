import { useStore } from '../createStore';
import { createCollection } from '../utils';
import { MessageModel } from './MessageModel';

export function useMessageCollection() {
  const store = useStore();
  return store.entities.messages;
}

export const MessageCollection = createCollection(MessageModel, {
});
