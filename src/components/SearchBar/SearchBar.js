import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style';
import { Collapse, Fade, Grow } from '@material-ui/core';

export default function SearchBar({ value, placeholder, onChange, onSearch }) {
    const classes = useStyles();
    
    function onSubmit(e) {
        e.preventDefault();
        onSearch();
    }

    return (
        <Grow in timeout={500}>
            <Paper elevation={3} component="form" onSubmit={onSubmit} className={classes.root}>
                <InputBase
                    className={classes.input}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                <IconButton onClick={onSearch} className={classes.iconButton} aria-label="search">
                    <SearchIcon type="submit" className={classes.searchIcon} />
                </IconButton>
            </Paper>
        </Grow>

    )
}