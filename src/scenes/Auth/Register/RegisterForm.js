import React from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import { Input } from 'src/components/Form/Input/Input';
import { SubmitBTN } from 'src/components/Form/Button/SubmitBtn';
import Api from 'src/api';
import { useStore } from 'src/stores/createStore';
import { validation as v } from '../validation/Validation';
import s from '../Auth.module.scss';

export const RegisterForm = () => {
  const history = useHistory();
  const store = useStore();
  async function onSubmit({
    email,
    password,
    fullName,
    passwordAgain,
  }) {
    await Api.Auth.register({ email, password, fullName });
    await store.auth.login.run({ email, password });
    store.viewer.setIsLoggedIn(true);
    if (localStorage.getItem('___savedProducts')) {
      const savedItemList = localStorage.getItem('___savedProducts').split(',');
      const list = new Array(...savedItemList.map((item) => Number(item)));
      await Api.Products.saveList(list);
    }
    localStorage.removeItem('___savedProducts');
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
              placeholder="Example@gmail.com"
              validate={v.validateEmail}
            />
          </div>
          <div className={s.group}>
            {' '}
            <Input
              name="fullName"
              label="FULL NAME"
              placeholder="Tony Stark"
              validate={v.validateFullName}
            />
          </div>
          <div className={s.group}>
            <Input
              name="password"
              label="PASSWORD"
              type="password"
              validate={v.validatePass}
            />
          </div>
          <div className={s.group}>
            <Input
              name="passwordAgain"
              label="PASSWORD AGAIN"
              validate={v.validatePass}
              type="password"
            />
          </div>
          <SubmitBTN name="Register" />
        </form>
      </Formik>
    </div>
  );
};
