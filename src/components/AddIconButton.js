import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { IconButton, withStyles } from '@material-ui/core';

const CustomIconButton = withStyles((theme) => ({
    root: {
        borderStyle: 'solid',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.paper,
        transition: '.2s',
        "&:hover": {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
        },
    }
}))(IconButton);

export default function AddIconButton(props) {
    return (
        <CustomIconButton
            aria-label="open drawer"
            {...props}
        >
            <AddIcon/>
        </CustomIconButton>
    )
}