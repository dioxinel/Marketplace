export const validation = {
  validateTitle(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (value.length < 4) {
      error = 'Title too short';
    }
    return error;
  },

  validateLocation(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (value.length < 4) {
      error = 'Location too short';
    }
    return error;
  },

  validatePrice(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[0-9]{1,15}$/i.test(value) || /^[A-Z._%+-]$/i.test(value)) {
      error = 'Invalid price ';
    }
    return error;
  },
};
