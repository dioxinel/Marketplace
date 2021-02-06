import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import { Input } from 'src/components/Form/Input/Input';
import { SubmitBTN } from 'src/components/Form/Button/SubmitBtn';
import Api from 'src/api';
import { useStore } from 'src/stores/createStore';
import { observer } from 'mobx-react';
import s from './EditProfile.module.scss';
import { UserAvatar } from 'src/components/User/UserAvatar';

export const EditProfileForm = observer(() => {
    const store = useStore();
    const user = store.viewer.user;
    useEffect(()=>{if (user) {
      document.getElementById('fullName').value = user.fullName
      document.getElementById('phone').value = user.phone
      document.getElementById('location').value = user.location
    }}, [user])
  async function onSubmit({
    fullName,
    phone,
    location,
  }) {
    const avatar = document.getElementById('avatar').value
    const res = await Api.Account.editProfile({ 
        fullName,
        avatar,
        phone,
        location, });
  }

  async function handleAddPhoto(e) {
    // Make button disable while photo loading
    const button = document.querySelector('#submit');
    button.disabled = 'true'
    // Read photo and set it as preview
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload=(async(e) => {
      await user.setAvatar(e.target.result);
        console.log(user)
      })
    //Send photo to server and set answered link
    // const inputNode = document.querySelector('#file');
    // const data = new FormData()
    // data.append('image', inputNode.files[0]);
    // const res = await Api.Products.uploadImage(data)
    // document.getElementById('avatar').value = res.data
    // //Clear input and make button be able
    // inputNode.value = '';
    // button.disabled = null
 }

const formikProps = {
    initialValues:  {
    fullName: '',
    phone: '',
    location: '',
    },
    onSubmit
}

  return (
    <div>
      <Formik {...formikProps}>
        <form>
        <div>
            <UserAvatar user={user} containerClass={s.avatarContainer} className={s.avatar}/>
            <input type={'file'} onChange={handleAddPhoto} id={'file'}></input>
            <Input
              name="avatar"
              id={'avatar'}
              className={s.avatarInputField}    
            />
          </div>
          <div>
            <Input
              name="fullName"
              label="FULL NAME"
              id={'fullName'}
              placeholder={'Tony Stark'}
              
            />
          </div>
          <div>
            <Input
              name="phone"
              label="phone"
              id={'phone'}
            />
          </div>
          <div>
            <Input
              name="location"
              label="location"
              id={'location'}
            />
          </div>
          <SubmitBTN name={'Edit'} id={'submit'}/>
        </form>
      </Formik>
    </div>
  );
})
