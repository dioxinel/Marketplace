import React from 'react';
import { getInitials } from './getInitials';

export function UserAvatar({user, avatar, containerClass, ...props}) {
  try {
    if(!user.avatar) {
      const userInitial = getInitials(user.fullName.split(' '));
      return (
        <div {...props}>{userInitial}</div>
      )
    }
    return (
      <div className={containerClass}>
        <img 
        src={user.avatar} 
        alt={"Exist"}
        {...props}
        />
      </div>
         
    );
  } catch (error) {
    return (
      <div>
        ...Loading
      </div>
    )
  }
}