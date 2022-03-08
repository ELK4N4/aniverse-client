import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import useStyles from './style';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { useStore } from '../../stores';

function ReplyBox({title, repliedComment, onClick}) {
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();

    return (
        <Paper onClick={onClick} elevation={0} className={classes.replyPaper} style={onClick ? {cursor: "pointer"} : {}}>
            {title && 
                <>
                    <Typography variant="body1">
                        {title}
                    </Typography>
                    <hr/>
                </>
            }
            <Typography variant="body1" style={{fontWeight: "bold"}}>
                {repliedComment.addedByUser.username}
            </Typography>
            <Typography variant="body2">
                {repliedComment.message}
            </Typography>
        </Paper>
    )
}

export default ReplyBox;
