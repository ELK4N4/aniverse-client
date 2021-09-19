import React, { useState, useEffect } from 'react';
import useStyles from './style';

export default function Home() {
    const classes = useStyles();
    
    return (
        <div className={classes.background}>
            Sandbox
        </div>
    );
}