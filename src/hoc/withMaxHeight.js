import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - ${theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight}px)`,
    },
  }
}));

const withMaxHeight = (WrappedComponent) => () => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <WrappedComponent />
        </div>
    );
}

export default withMaxHeight;