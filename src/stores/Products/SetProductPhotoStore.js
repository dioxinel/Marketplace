import { destroy, getSnapshot, types } from 'mobx-state-tree';

const PhotoStore = types.model('PhotoStore', {
  preview: types.string,
  link: types.string,
}).actions((store) => ({
  delete() {
    destroy(store);
  },
}));

export const SetProductPhotoStore = types.model('SetProductPhotoStore', {
  photos: types.optional(types.array(PhotoStore), []),
}).actions((store) => ({
  addPhoto(preview, link) {
    store.photos = [...store.photos, { preview, link }];
  },

  clearPhotos() {
    store.photos = [];
  },

  remove(index) {
    store.photos[index].delete();
  },
}));
