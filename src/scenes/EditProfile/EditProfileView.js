import { EditProfileForm  } from './EditProfileForm'
import React from 'react';
import s from './EditProfile.module.scss';

export const EditProfileView = () => {
 
  return (
    <div className={s.pageBody}>
      <div className={s.editProfile}>
        <div className={s.title}>Edit profile</div>
        <EditProfileForm />
      </div>
    </div>   
  );
}

