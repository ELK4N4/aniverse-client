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
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { userUpdateScheme } from '@aniverse/utils';

function UserContainer() {
    const store = useStore();
    const { userStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const initialState = { username: userStore.user.user.username, email: userStore.user.user.email, password: ''};
    const [form, setForm] = useState(initialState);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const handleSubmit = (values) => {
        userStore.updateCurrentUser(values,
            () => {
                enqueueSnackbar('פרטי משתמש עודכנו', {variant: 'success'});
            },
            (error) => {
                enqueueSnackbar(error, {variant: 'error'});
            }
        );
    };

    const formik = useFormik({ initialValues: initialState,
        validateOnBlur: true,
        onSubmit: handleSubmit,
        validationSchema: userUpdateScheme
    })

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <>
            <Paper elevation={5} className={classes.paper}>
                <Typography align="center" variant="h5" className={classes.contianerTitle}>
                    פרטי משתמש
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        <TextField
                            error={formik.touched.email && formik.errors.email}
                            helperText={formik.touched.email && formik.errors.email}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={form.email}
                            id="email"
                            label="כתובת אימייל"
                            name="email"
                            autoComplete="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <TextField
                            error={formik.touched.username && formik.errors.username}
                            helperText={formik.touched.username && formik.errors.username}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={form.username}
                            id="username"
                            label="שם משתמש"
                            name="username"
                            autoComplete="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        <TextField
                            error={formik.touched.password && formik.errors.password}
                            helperText={formik.touched.password && formik.errors.password}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={form.password}
                            label="סיסמא"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
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

export default observer(UserContainer);