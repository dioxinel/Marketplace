import React from 'react';
import s from '../Auth.module.scss';
import LoginForm from './LoginForm';

function Login() {
  return (
    <div className={s.pageBody}>
      <LoginForm />
    </div>
  );
}

export default Login;
