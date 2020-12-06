import React from 'react';
import { getInitials } from './getInitials';

export function UserAvatar({user, ...props}) {
  try {
    if(!user.avatar) {
      const userInitial = getInitials(user.fullName.split(' '));
      return (
        <div {...props}>{userInitial}</div>
      )
    }
    return (
      <div {...props}>
         <img 
        src={user.avatar} 
        alt={"Exist"} 
        />
      </div>
    );
  } catch (error) {
    return (
      <div>
        Loading
      </div>
    )
  }
}