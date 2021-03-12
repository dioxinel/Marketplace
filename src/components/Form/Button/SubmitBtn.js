import React from 'react';
import { useFormikContext } from 'formik';

export const SubmitBTN = ({
  props, name, id, className,
}) => {
  const form = useFormikContext(props);

  return (
    <button
      type="button"
      onClick={form.handleSubmit}
      id={id}
      className={className}
    >
      {name}
    </button>
  );
};
