import { Avatar, Box, Chip, Paper, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './style';
import * as api from '../../../api';
import { useStore } from '../../../stores';
import { useSnackbar } from 'notistack';

export default function UserDetails({user, viewingTracking}) {
    const classes = useStyles();
    
    return (
        <>
            <Paper elevation={5} className={classes.paper}>
                <Box className={classes.mainBox}>
                    <Box className={classes.metadataBox}>
                        <div>
                            <Avatar src={user?.avatar} className={classes.userImage}/>
                        </div>
                    </Box>
                    <div className={classes.userDetails} >
                        <Box display="flex" alignItems="center">
                            <Typography variant="h2" >
                                    { user?.username }
                            </Typography>
                            <Box>
                                {user?.role && (
                                    <Chip color="primary" label={user?.role} className={classes.roleChip}/>
                                )}
                            </Box>
                        </Box>
                        {user && 
                            <>
                                <Typography variant="h6">
                                    יש אנשים ויש אנשים
                                </Typography>
                                <Typography variant="body1" style={{color: 'grey'}}>
                                    הצטרף בתאריך:&nbsp;
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </Typography>
                            </>
                        }
                        {viewingTracking?.map((anime) => (
                            <Typography key={anime} variant="h5">
                                {anime.animeId}
                            </Typography>
                        ))}
                        <hr />
                    </div>
                </Box>
                dasfdas
                sadfadsfasdf
                asdf
            </Paper>
        </>
    );
}