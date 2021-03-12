import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { getInitials } from './getInitials';

export function UserAvatar({
  user, avatar, containerClass, ...props
}) {
  try {
    if (!user.avatar) {
      const userInitial = getInitials(user.fullName.split(' '));
      return (
        <div {...props}>{userInitial}</div>
      );
    }
    return (
      <div className={containerClass}>
        <img
          src={user.avatar}
          alt="Exist"
          {...props}
        />
      </div>

    );
  } catch (error) {
    return (
      <div>
        <ClipLoader color="#349A89" loading={!!user} size={50} />
      </div>
    );
  }
}
