import React from 'react';
import { Formik } from 'formik';
import s from '../Auth.module.scss';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import { Input } from 'src/components/Form/Input/Input';
import { validation as v } from '../validation/Validation';
import { SubmitBTN } from 'src/components/Form/Button/SubmitBtn';
import Api from 'src/api';

export const RegisterForm = () => {
  const history = useHistory();
  async function onSubmit({
    email,
    password,
    fullName,
    passwordAgain,
  }) {
    await Api.Auth.register({ email, password, fullName });

    history.push(routes.home);
  }

  const formikProps = {
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passwordAgain: '',
    },
    onSubmit,
  };

  return (
    <div className="App">
      <Formik {...formikProps}>
        <form className={s.form}>
          <h3>Register</h3>
          <div className={s.group}>
            <Input
              name="email"
              label="EMAIL"
              placeholder={'Example@gmail.com'}
              validate={v.validateEmail}
            />
          </div>
          <div className={s.group}>
            {' '}
            <Input
              name="fullName"
              label="FULL NAME"
              placeholder={'Tony Stark'}
              validate={v.validateFullName}
            />
          </div>
          <div className={s.group}>
            <Input
              name="password"
              label="PASSWORD"
              validate={v.validatePass}
            />
          </div>
          <div className={s.group}>
            <Input
              name="passwordAgain"
              label="PASSWORD AGAIN"
              validate={v.validatePass}
            />
          </div>
          <SubmitBTN name={'Register'} />
        </form>
      </Formik>
    </div>
  );
};
