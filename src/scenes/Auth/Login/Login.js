import React from 'react';
import Header from 'src/components/Header/Header';
import s from '../Auth.module.scss';
import LoginForm from './LoginForm';

function Login() {
  return (
    <div className={s.pageBody}>
      <Header />
      <LoginForm />
    </div>
  );
}

export default Login;
