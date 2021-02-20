import { types } from 'mobx-state-tree';

export const SearchParamsStore = types
  .model('SearchParam', {
    keywords: types.optional(types.string, ''),
    location: types.optional(types.string, ''),
    priceFrom: types.optional(types.string, ''),
    priceTo: types.optional(types.string, ''),
  }).actions((store)=>({
    setKeywords(keywords) {
      store.keywords = keywords;
    },

    setLocation(location) {
      store.location = location;
    },
    
    setPriceFrom(priceFrom) {
      store.priceFrom = priceFrom;
    },

    setPriceTo(priceTo) {
      store.priceTo = priceTo;
    }
  }))