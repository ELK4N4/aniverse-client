import { Box, Paper } from "@material-ui/core";
import React, { Component } from "react";
import useStyles from './style';

function PaperHeaderSection({ children, align, justify }) {
  const classes = useStyles();
  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child);
    }
    return child;
  });

  return (
    <div style={{gridArea: align, justifySelf: justify, marginBottom: 20}} >
      {childrenWithProps}
    </div>
  )
}

export default PaperHeaderSection;