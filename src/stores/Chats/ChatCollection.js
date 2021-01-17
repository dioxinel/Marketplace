import { useStore } from "../createStore";
import { createCollection } from "../utils";
import { ChatModel } from './ChatModel'


export function useChatCollection() {
    const store = useStore();
    return store.entities.chats
}

export const ChatCollection = createCollection(ChatModel, {
});


