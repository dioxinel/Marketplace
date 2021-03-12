import React from 'react';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import { Link } from 'react-router-dom';
import s from '../Header.module.scss';

export function LoginButton() {
  const history = useHistory();

  return (
    <Link
      to={routes.login}
      className={s.logBtn}
    >
      Login
    </Link>

  );
}
