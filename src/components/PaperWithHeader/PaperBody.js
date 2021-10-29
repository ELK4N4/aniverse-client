import { Box, CircularProgress, Divider, LinearProgress, Paper } from "@material-ui/core";
import React, { Component } from "react";
import useStyles from './style';

function PaperBody({ children, loading }) {
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
      {loading ?
            <LinearProgress />
        :
        childrenWithProps
      }
    </>
    )
}

export default PaperBody;