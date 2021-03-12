import React from 'react';
import { EditProfileForm } from './EditProfileForm';
import s from './EditProfile.module.scss';

export const EditProfileView = () => (
  <div className={s.pageBody}>
    <div className={s.editProfile}>
      <div className={s.title}>Edit profile</div>
      <EditProfileForm />
    </div>
  </div>
);
