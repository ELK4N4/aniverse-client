import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import useStyles from './style';
import { FormControl, InputLabel, MenuItem, Select, Typography, withStyles } from '@material-ui/core';
import { useStore } from '../../stores';

function ReplyBox({title, repliedComment, onClick}) {
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();

    const ReplyTypography = withStyles({
        root: {
          color: "black"
        }
    })(Typography);

    return (
        <Paper onClick={onClick} elevation={0} className={classes.replyPaper} style={onClick ? {cursor: "pointer"} : {}}>
            {title && 
                <>
                    <ReplyTypography variant="body1">
                        {title}
                    </ReplyTypography>
                    <hr/>
                </>
            }
            {repliedComment === "deleted" ? 
                <ReplyTypography variant="body2" style={{fontStyle: "italic "}}>
                    {repliedComment === "deleted" ? "תגובה זו נמחקה" : repliedComment.message}
                </ReplyTypography>
            :
                <>
                    <ReplyTypography variant="body1" style={{fontWeight: "bold"}}>
                        {repliedComment.addedByUser.username}
                    </ReplyTypography>
                    <ReplyTypography variant="body2">
                        {repliedComment.message}
                    </ReplyTypography>
                </>
            }
        </Paper>
    )
}

export default ReplyBox;
