import { types } from 'mobx-state-tree';

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
        const promise = thunk(...args)(store);

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
          store.error(err);
        }
      },
    }));
  return types.optional(model, {});
}
