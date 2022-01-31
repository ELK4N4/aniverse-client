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
import { forgotPasswordScheme } from '@aniverse/utils/validations';
import * as api from '../../api';
import errorMessage from '../../errorMessage';


function ResetPassword() {
    const store = useStore();
    const { userStore } = useStore();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    let location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const [isSlide, setIsSlide] = useState(true);

    const handleSubmit = async (values) => {
        store.startLoading();
        try {
            const { data } = await api.forgotPassword(values);
            enqueueSnackbar('נשלח קישור איפוס סיסמא למייל', {variant: 'success'});
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    };

    const formik = useFormik({ initialValues: {email: email || ''},
        validateOnBlur: true,
        onSubmit: handleSubmit,
        validationSchema: forgotPasswordScheme
    })

    return (
        <Grow in>
            <Container component="main" maxWidth="xs" className={classes.root}>
                <CssBaseline />
                <Paper elevation={5} className={classes.paper}>
                    <Slide direction="down" in={isSlide} timeout={450}>
                        <Typography component="h1" variant="h5">
                            שכחתי סיסמא
                        </Typography>
                    </Slide>
                    <Slide direction="left" in={isSlide}>
                        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                            <TextField
                                error={formik.touched.email && formik.errors.email}
                                helperText={formik.touched.email && formik.errors.email}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="מייל"
                                type="email"
                                id="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                שלח
                            </Button>
                        </form>
                    </Slide>
                </Paper>
            </Container>
        </Grow>
    );
}

export default ResetPassword;