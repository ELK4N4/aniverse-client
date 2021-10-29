import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';


function TabContainer(props) {
  const { children, value, index, ...other } = props;
  const childrenWithProps = React.Children.map(children, child => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        child = React.cloneElement(child);
      }

      return child;
  });
  return childrenWithProps;
}

TabContainer.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabContainer;