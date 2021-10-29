import { Paper } from "@material-ui/core";
import React, { Component } from "react";
import useStyles from './style';
import PaperHeader from './PaperHeader';
import PaperHeaderSection from './PaperHeaderSection';
import PaperBody from './PaperBody';

function PaperWithHeader({ children }) {
  const classes = useStyles();
  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child);
    }
    return child;
  });

  return <Paper elevation={5} className={classes.paper}>{childrenWithProps}</Paper>
}


export default PaperWithHeader;
export {PaperHeader, PaperHeaderSection, PaperBody };