import React from 'react';
import Header from '../../../components/Header/Header';
import { RegisterForm } from './RegisterForm';
import s from '../Auth.module.scss';

function Register() {
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <Header />
      <div className={s.pageBody}>
        <RegisterForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default Register;
