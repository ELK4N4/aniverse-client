import { Box, Paper } from "@material-ui/core";
import React, { Component } from "react";
import useStyles from './style';

function PaperHeaderSection({ children, align, justify, fullWidth }) {
  const classes = useStyles();
  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child);
    }
    return child;
  });

  const getStyle = () => {
    if(fullWidth) {
      return {gridArea: align, justifySelf: justify, marginBottom: 20, width: '90%'};
    } else {
      return {gridArea: align, justifySelf: justify, marginBottom: 20};
    }
  }

  return (
    <div style={getStyle()} >
      {childrenWithProps}
    </div>
  )
}

export default PaperHeaderSection;