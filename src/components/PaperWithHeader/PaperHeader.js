import { Box, Divider, Paper } from "@material-ui/core";
import React, { Component } from "react";
import useStyles from './style';

function PaperHeader({ children, divider }) {
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
    <>
      <Box elevation={5} className={classes.header}>
        {childrenWithProps}
      </Box>
      {divider && <Divider />}
    </>
    )
}

export default PaperHeader;