
import { normalize } from "normalizr";
import Api from "src/api";
import { useStore } from "../createStore";
import { Product } from "../schemas";
import { asyncModel, createCollection } from "../utils";
import { ProductModel } from "./ProductModel";


export function useProductCollection() {
    const store = useStore();
    return store.entities.products
}

export const ProductCollection = createCollection(ProductModel, {
    getProduct: asyncModel(getProduct),
});


function getProduct(id) {
    return async function getProductFlow(flow, store, Root) {
        const product = store.collection.get(id)
        if(!product || !product.owner) {
            const res = await Api.Products.getProduct(id)
            const { entities } = normalize(res.data, Product)

            Root.entities.merge(entities)
        };
        return
    }
}