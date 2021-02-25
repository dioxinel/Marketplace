import { useStore } from "src/stores/createStore"

export function SaveProductUnAuthViewer(data, store) {
  if(store.viewer.user || !localStorage.getItem('___savedProducts')) {
    return (data)
  }

  const savedProducts = [...localStorage.getItem('___savedProducts').split(',')]
  if (data.id) {
    if(savedProducts.includes(data.id + '')) {
      data.saved = true;
    }
    return data
  }

    data.map((item)=>{
      if(savedProducts.includes(item.id + '')) {
        item.saved = true;
      }
    })
  return(data)
}