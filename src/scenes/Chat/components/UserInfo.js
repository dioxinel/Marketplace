
import React from 'react';
import { UserAvatar } from 'src/components/User/UserAvatar';
import s from './../Chat.module.scss';


export const UserInfo = ({ user }) => {
  return (
    <div>
        <UserAvatar user={user} className={s.avatar}/>
        <div>{user.fullName}</div> 
    </div>
  )
}

