import React from 'react';
import { UserAvatar } from 'src/components/User/UserAvatar';
import s from './UserProducts.module.scss';

export const UserProfileInfo = ({user}) => {
    return (
      <div className={s.userProfileInfo}>
          <UserAvatar user={user} className={s.avatar}/>
          <div className={s.fullName}>{user.fullName}</div>
      </div>
    );
  }
 