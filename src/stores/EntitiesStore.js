import { types } from "mobx-state-tree"
import { normalize } from "normalizr"
import { ChatCollection } from "./Chats/ChatCollection"
import { MessageCollection } from "./Chats/MessageCollection"

import { ProductCollection } from "./Products/ProductsCollection"
import { UserCollection } from "./Users/UserCollection"

export const EntitiesStore = types.model('EntitiesStore', {
    products: ProductCollection,
    chats: ChatCollection,
    messages: MessageCollection,
    users: UserCollection,
}).actions((store) => ({
    merge(entities) {
        Object.keys(entities).forEach((collectionName) => {
            const collectionEntities = entities[collectionName]
            Object.keys(collectionEntities).forEach((id) => {
                const value = collectionEntities[id]
                store[collectionName].add(id, value)
            })
        }) 
    },
    normalize(item, schema) {
        const { result, entities } = normalize(item, schema);

        store.merge(entities);

        return result;
    }
}))