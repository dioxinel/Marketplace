export const validation = {
  validateEmail(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
      error = 'Invalid email address';
    }
    return error;
  },

  validateFullName(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (value.length < 4) {
      error = 'Full name too short';
    }
    return error;
  },

  validatePass(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (value.length < 4) {
      error = 'Full name too short';
    }
    return error;
  },
};
