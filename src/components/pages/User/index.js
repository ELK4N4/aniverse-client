import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import useStyles from './style';
import UserDetails from './UserDetails';

export default function User() {
    const classes = useStyles();
    
    return (
        <>
            <div className={classes.showcase} />
            <Container maxWidth="lg" className={classes.container}>
                <UserDetails />
            </Container>
        </>
    );
}