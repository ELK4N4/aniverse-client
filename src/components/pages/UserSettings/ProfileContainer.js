import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../stores';
import { Skeleton } from '@material-ui/lab';
import { toJS } from 'mobx';
import { Slide } from '@material-ui/core';
import AnimeCards from '../../Cards/AnimeCards';


function ProfileContianer() {
    const store = useStore();
    const { userStore } = store;
    const initialState = { profileImage: userStore.user.user.profileImage, banner: userStore.user.user.banner};
    const [form, setForm] = useState(initialState);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <>
            <Paper elevation={5} className={classes.paper}>
                <Typography align="center" variant="h5" className={classes.contianerTitle}>
                    פרופיל
                </Typography>
                <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={form.profileImage}
                            id="profileImage"
                            label="תמונת פרופיל"
                            name="profileImage"
                            autoComplete="profileImage"
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={form.banner}
                            id="banner"
                            label="באנר"
                            name="banner"
                            autoComplete="banner"
                            onChange={handleChange}
                        />
                        <br />
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            שמור
                        </Button>
                    </form>
            </Paper>
        </>
    )
}

export default observer(ProfileContianer);