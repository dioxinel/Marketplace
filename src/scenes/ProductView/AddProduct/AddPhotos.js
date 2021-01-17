import { observer } from 'mobx-react';
import React from 'react';
import Api from 'src/api';
import Icon from 'src/components/Icon';
import { useStore } from 'src/stores/createStore';
import s from '../Product.module.scss';
import { AddItemBtn } from './AddItemBtn';

function AddPhotos() {
  const store = useStore()
  const previewList = store.setProductPhoto.preview

  async function handleChange(e) {
    // Make button disable while photo loading
    const button = document.querySelector('#submit');
    button.disabled = 'true'
    // Read photo and set it as preview
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload=(async(e) => {
      await store.setProductPhoto.addPreview(e.target.result);
      })
    //Send photo to server and set answered link
    const inputNode = document.querySelector('#file');
    const data = new FormData()
    data.append('image', inputNode.files[0]);
    const res = await Api.Products.uploadImage(data)
    store.setProductPhoto.addLink(res.data);
    //Clear input and make button be able
    inputNode.value = '';
    button.disabled = null
  }


  function handleRemovePhoto(e) {
    const nodeNum = e.target.closest('div').id;
    store.setProductPhoto.remove(nodeNum);  
  }


  return (
    <div className={s.photosListContainer}>
      <ul className={s.photosList}>
        {previewList.map(
          (item) => {
            return (
            <div 
              key={previewList.indexOf(item)}
              id={previewList.indexOf(item)}
              className={s.photoItemContainer}>
              <li>
                <img 
                  src={item} 
                  alt={"Exist"}
                  className={s.photo}
                />
              </li>
              <Icon
                name={'cross'}
                onClick={handleRemovePhoto}
                className={s.cross} 
              />
            </div>   
        )})}
        <AddItemBtn handleChange={handleChange}/>
      </ul>
    </div>   
  );
}

export default observer(AddPhotos)
