import React from 'react';
import T from 'prop-types';
import { iconsConfig } from '../iconsConfig.js';

const Icon = ({ name, ...props }) => {
  const IconC = iconsConfig[name];
  return (
    <IconC {...props} />
  );
};

Icon.protoTypes = {
  name: T.string.isRequired,
};

export default Icon;
