import React from 'react';
import { useHistory } from 'react-router';
import { routes } from 'src/scenes/routes';
import { Formik } from 'formik';
import { Input } from 'src/components/Form/Input/Input';
import { SubmitBTN } from 'src/components/Form/Button/SubmitBtn';
import s from '../Auth.module.scss';
import { useStore } from 'src/stores/createStore';

function LoginForm() {
  const history = useHistory();
  const store = useStore();

  async function onSubmit({ email, password }) {
    await store.auth.login.run({ email, password });
    store.viewer.setIsLoggedIn(true);
    history.push(routes.home);
  }
  const formikProps = {
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  };

  return (
    <div className="App">
      <Formik {...formikProps}>
        <form className={s.form}>
          <h3>Login</h3>
          <div className={s.group}>
            <Input
              name="email"
              label="EMAIL"
              placeholder={'Example@gmail.com'}
            />
          </div>

          <div className={s.group}>
            <Input name="password" label="PASSWORD" />
            <a href={'/auth/reset-password'}>
              Don't remember password?
            </a>
          </div>

          <SubmitBTN name={'Continue'} />
        </form>
      </Formik>
    </div>
  );
}

export default LoginForm;
