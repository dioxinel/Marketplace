import {
  applySnapshot,
  getIdentifier,
  getParent,
  getRoot,
  isStateTreeNode,
  onSnapshot,
  resolveIdentifier,
  types,
} from 'mobx-state-tree';

export function asyncModel(thunk, auto = true) {
  const model = types
    .model('AsyncModel', {
      isLoading: false,
      isError: false,
    })

    .actions((store) => ({
      start() {
        store.isError = false;
        store.isLoading = true;
      },

      end() {
        store.isLoading = false;
      },

      error(err) {
        store.isError = true;
        store.isLoading = false;
      },
      run(...args) {
        const promise = thunk(...args)(
          store,
          getParent(store),
          getRoot(store),
        );

        if (auto) {
          store._auto(promise);
        }

        return promise;
      },

      async _auto(promise) {
        try {
          store.start();
          
          await promise;
          store.end();
        } catch (err) {
          console.log(err)
          store.error(err);
        }
      },
    }));
  return types.optional(model, {});
}

export function createPersist(store) {
  onSnapshot(store, (snapshot) => {
    window.localStorage.setItem(
      '___persist',
      JSON.stringify(snapshot.viewer),
    );
  });
  function rehydrate() {
    const snapshot = window.localStorage.getItem('___persist');
    if (snapshot) {
      applySnapshot(store, JSON.parse(snapshot));
    }
  }
  return {
    rehydrate,
  };
}


export function createCollection(ofModel, asyncModel = {}) {
  const collection = types.model('CollectionModel', {
      collection: types.map(ofModel),
      ...asyncModel
  }).views((store) => ({
    get(key) {
      return store.collection.get(String(key))
    },
  }))
  .actions((store) => ({
      add(key, value) {
          store.collection.set(String(key), value)
      }
  }))
  return types.optional(collection, {})
}


export function safeReference(T) {
  return types.reference(T, {
    get(identifier, parent) {
      if(isStateTreeNode(identifier)) {
        identifier = getIdentifier(identifier);
      }

      return resolveIdentifier(T, parent, identifier);
    },
    set(value) {
      return value
    },
  });
}