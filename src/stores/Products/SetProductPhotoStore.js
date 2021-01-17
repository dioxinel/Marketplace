import { getSnapshot, types } from 'mobx-state-tree';


export const SetProductPhotoStore = types.model('SetProductPhotoStore', {
  preview: types.array(types.maybe(types.string)),
  link: types.array(types.maybe(types.string))
}).actions((store) => ({
    addPreview(preview) {
      store.preview = [...store.preview, preview]
    },
    addLink(link) {
      store.link = [...store.link, link]
    },

    remove(index) {
      // console.log('index', index)
      // store.link = store.link.filter(item => store.link.indexOf(item) !== index);
      // store.preview = store.link.filter(item => store.link.indexOf(item) !== index);
      // console.log(getSnapshot(store.link), getSnapshot(store.preview))
      // console.log(store.preview.length)
      // if(store.preview.length === 1) { 
        
      //   store.preview.shift()
      //   store.link.shift()
      //   return
      // } 
      // store.preview = [store.preview.splice(index, 1)]
      // store.link = [store.link.splice(index, 1)]
      
    } 
  }));


// function addPhotoToProduct(e, inputNode) {
//   return async function addPhotoToProductFlow(flow, store, Root) {
//         const files = e.target.files
//         const reader = new FileReader()
//         reader.readAsDataURL(files[0])
//         reader.onload=((e) => {
//         store.preview = [...store.preview, e.target.result]
//         console.log(store.preview)
//       })

//         // const data = new FormData()
//         // data.append('image', inputNode.files[0]);
//         // const res = await Api.Products.uploadImage(data)
//         // store.link = [...store.link, res.data]
//     }
// }
  

