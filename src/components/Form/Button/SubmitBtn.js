import React from 'react';
import { useFormikContext } from 'formik';

export const SubmitBTN = ({ props, name }) => {
  const form = useFormikContext(props);

  return (
    <button type="button" onClick={form.handleSubmit}>
      {name}
    </button>
  );
};
