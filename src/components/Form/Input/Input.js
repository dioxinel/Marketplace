import React from 'react';
import { useField, Field } from 'formik';
import s from './Input.module.scss';

export const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label>
        {label}
        <Field {...field} {...props} />
      </label>
      {meta.touched && meta.error && (
        <div className={s.error}>{meta.error}</div>
      )}
    </>
  );
};
