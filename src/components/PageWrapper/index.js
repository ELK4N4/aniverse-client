import React, { useState, useEffect } from 'react';
import useStyles from './style';

export default function PageWrapper({children}) {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            {children}
        </div>
    );
}