import React from 'react';
import { iconsConfig } from '../iconsConfig.js';
import T from 'prop-types'

const Icon = ({ name, ...props }) => {
    const IconC = iconsConfig[name];
    return (
        <IconC { ...props } />
    );
  }

  Icon.protoTypes = {
    name: T.string.isRequired,
}

  export default Icon;