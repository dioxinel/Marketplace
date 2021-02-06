import { schema } from 'normalizr'


export const User = new schema.Entity('users', {
});

export const Product = new schema.Entity('products', {
    owner: User,
});

export const LatestProduct = new schema.Entity('products');

export const LatestProductCollection = [LatestProduct];

export const SearchProduct = new schema.Entity('products');

export const SearchProductCollection = [SearchProduct];

export const MessageSchema = new schema.Entity('messages')

export const MessageCollectionSchema = [MessageSchema]

export const ChatSchema = new schema.Entity('chats', {
    'message': MessageSchema,
    'product': Product,
    'participants': [User],
});

export const ChatCollectionSchema = [ChatSchema];