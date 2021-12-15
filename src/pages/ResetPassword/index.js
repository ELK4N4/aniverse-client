import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as MuiLink } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grow, Slide, CircularProgress, Paper } from '@material-ui/core';
import useStyles from './style';
import { useStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { resetPasswordScheme } from '@aniverse/utils/validations';
import * as api from '../../api';
import errorMessage from '../../errorMessage';

const initialState = { email: '', username: '', password: '', confirmPassword: '' };

function ResetPassword() {
    const store = useStore();
    const { userStore } = useStore();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    let location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const [isSlide, setIsSlide] = useState(true);

    const handleSubmit = async (values) => {
        store.startLoading();
        try {
            const { data } = await api.resetPassword(token, values);
            enqueueSnackbar('סיסמא אופסה בהצלחה!', {variant: 'success'});
            history.push('login');
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    };

    const formik = useFormik({ initialValues: initialState,
        validateOnBlur: true,
        onSubmit: handleSubmit,
        validationSchema: resetPasswordScheme
    })

    return (
        <Grow in>
            <Container component="main" maxWidth="xs" className={classes.root}>
                <CssBaseline />
                <Paper elevation={5} className={classes.paper}>
                    <Slide direction="down" in={isSlide} timeout={450}>
                        <Typography component="h1" variant="h5">
                            איפוס סיסמא
                        </Typography>
                    </Slide>
                    <Slide direction="left" in={isSlide}>
                        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                            <TextField
                                error={formik.touched.password && formik.errors.password}
                                helperText={formik.touched.password && formik.errors.password}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="סיסמא"
                                type="password"
                                id="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            <TextField
                                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="confirmPassword"
                                label="אימות סיסמה"
                                name="confirmPassword"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                אפס סיסמא
                            </Button>
                        </form>
                    </Slide>
                </Paper>
            </Container>
        </Grow>
    );
}

export default ResetPassword;