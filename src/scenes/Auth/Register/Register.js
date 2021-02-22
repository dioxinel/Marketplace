import React from 'react';
import { RegisterForm } from './RegisterForm';
import s from '../Auth.module.scss';
import { Link } from 'react-router-dom';
import { routes } from 'src/scenes/routes';

function Register() {
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <div className={s.pageBody}>
        <RegisterForm onSubmit={onSubmit} />
        <div className={s.linkToAuth}>
          I already have an account,
          <Link to={routes.login} className={s.link}>Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
