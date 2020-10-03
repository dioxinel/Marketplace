import React from 'react';
import Header from 'src/components/Header/Header';
import { Formik } from 'formik';
import { Input } from 'src/components/Form/Input/Input';
import { SubmitBTN } from 'src/components/Form/Button/SubmitBtn';
import s from '../Auth.module.scss';

function ResetPassword() {
  function onSubmit({ email }) {
    alert('Your password deleted!');
  }

  const formikProps = {
    initialValues: {
      email: '',
    },
    onSubmit,
  };

  return (
    <div>
      <Header />
      <div className={s.pageBody}>
        <Formik {...formikProps}>
          <form className={s.form}>
            <h3>Restore Password</h3>
            <div className={s.group}>
              <Input
                name="email"
                label="EMAIL"
                placeholder={'Example@gmail.com'}
              />
            </div>

            <SubmitBTN name={'Continue'} />
          </form>
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;
