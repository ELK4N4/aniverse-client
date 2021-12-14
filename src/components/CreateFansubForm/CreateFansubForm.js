import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as MuiLink } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grow, Slide, Paper } from '@material-ui/core';
import useStyles from './style';
import { useStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { autorun, runInAction } from 'mobx';
import * as api from '../../api';
import { useSnackbar } from 'notistack';
import { fansubScheme } from '@aniverse/utils/validations';
import { useFormik } from 'formik';
import errorMessage from '../../errorMessage';


const initFansub = {
    name: '',
    avatar: '',
    banner: '',
    website: '',
    description: '',
}

function CreateFansubForm() {
    const store = useStore();
    const history = useHistory();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        store.startLoading();
        try {
            const { data } = await api.addFansub(values);
            enqueueSnackbar('פאנסאב נוסף בהצלחה', {variant: 'success'});
            history.push('/fansubs/' + data._id);
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    };

    const formik = useFormik({ initialValues: initFansub,
        validateOnBlur: true,
        onSubmit: handleSubmit,
        validationSchema: fansubScheme
    });

    return (
        <Grow in>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Paper elevation={5} className={classes.paper}>
                    <Slide direction="down" in timeout={500}>
                        <Typography component="h1" variant="h5">
                            יצירת פאנסאב
                        </Typography>
                    </Slide>
                    <Slide direction="left" in timeout={300}>
                        <form autoComplete="off" className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                            <TextField
                                error={formik.touched.name && formik.errors.name}
                                helperText={formik.touched.name && formik.errors.name}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="שם הפאנסאב"
                                name="name"
                                autoFocus
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            <TextField
                                error={formik.touched.avatar && formik.errors.avatar}
                                helperText={formik.touched.avatar && formik.errors.avatar}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="avatar"
                                label="תמונה"
                                name="avatar"
                                autoComplete="off"
                                onChange={formik.handleChange}
                                value={formik.values.avatar}
                            />
                            <TextField
                                error={formik.touched.banner && formik.errors.banner}
                                helperText={formik.touched.banner && formik.errors.banner}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="banner"
                                label="באנר"
                                name="banner"
                                autoComplete="off"
                                onChange={formik.handleChange}
                                value={formik.values.banner}
                            />
                            <TextField
                                error={formik.touched.website && formik.errors.website}
                                helperText={formik.touched.website && formik.errors.website}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="website"
                                label="קישור לאתר"
                                name="website"
                                autoComplete="off"
                                onChange={formik.handleChange}
                                value={formik.values.website}
                            />
                            <TextField
                                error={formik.touched.description && formik.errors.description}
                                helperText={formik.touched.description && formik.errors.description}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                minRows={4}
                                id="description"
                                label="תיאור"
                                name="description"
                                autoComplete="off"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                צור
                            </Button>
                        </form>
                    </Slide>
                </Paper>
            </Container>
        </Grow>
    );
}

export default CreateFansubForm;