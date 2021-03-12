import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'src/scenes/routes';
import s from '../Auth.module.scss';
import LoginForm from './LoginForm';

function Login() {
  return (
    <div className={s.pageBody}>
      <LoginForm />
      <div className={s.linkToAuth}>
        I have no account,
        <Link to={routes.register} className={s.link}>Register Now</Link>
      </div>
    </div>
  );
}

export default Login;
