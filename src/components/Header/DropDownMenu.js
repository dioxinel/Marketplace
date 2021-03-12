import React, { useState } from 'react';
import { useStore } from 'src/stores/createStore';
import { generatePath } from 'react-router';
import { routes } from 'src/scenes/routes';
import Api from 'src/api';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';
import { UserAvatar } from '../User/UserAvatar';

export function DropDownMenu() {
  const [open, setOpen] = useState(false);
  const store = useStore();
  const { user } = store.viewer;

  function outerClickListener(e) {
    const node = e.target.closest('#dropDownMenu');

    if (!node) {
      closeMenu();
    }
  }

  function closeMenu() {
    document.removeEventListener('click', outerClickListener);
    setOpen(false);
  }

  function openMenu() {
    document.addEventListener('click', outerClickListener);
    if (open) return closeMenu();
    setOpen(true);
  }

  function handleLogout() {
    Api.Auth.logout();
    store.viewer.setViewer(undefined);
    store.viewer.setIsLoggedIn(false);
  }

  return (
    <div id="avatar">
      <UserAvatar user={user} containerClass={s.avatarContainer} className={s.avatar} onClick={openMenu} />
      { open
        && (
        <div id="dropDownMenu" className={s.dropDownMenu}>
          <div className={s.userInfo}>
            <UserAvatar user={user} containerClass={s.avatarContainer} className={s.avatar} />
            <div className={s.userTextInfo}>
              <p className={s.fullName}>{user.fullName}</p>
              <p className={s.email}>{user.email}</p>
              <Link
                to={generatePath(routes.userProducts, { userId: user.id })}
                className={s.profile}
                onClick={() => { closeMenu(); }}
              >
                Profile
              </Link>
            </div>
          </div>
          <div className={s.editContainer}>
            <Link
              to={routes.editProfile}
              className={s.editProfile}
              onClick={() => { closeMenu(); }}
            >
              Edit Profile
            </Link>
          </div>
          <div className={s.logoutContainer}>
            <Link
              to={routes.login}
              className={s.logout}
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </div>
        )}

    </div>

  );
}
