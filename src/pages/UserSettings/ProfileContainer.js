import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores';
import { Skeleton } from '@material-ui/lab';
import { toJS } from 'mobx';
import { Slide } from '@material-ui/core';
import AnimeCards from '../../components/Cards/AnimeCards';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { userUpdateScheme } from '@aniverse/utils/validations';
import PaperWithHeader, { PaperBody, PaperHeader, PaperHeaderSection } from '../../components/PaperWithHeader';

function ProfileContianer() {
    const store = useStore();
    const { userStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const initialState = { username: userStore.user.user.username, email: userStore.user.user.email, password: '', avatar: userStore.user.user.avatar, banner: userStore.user.user.banner, about: userStore.user.user.about};
    const [form, setForm] = useState(initialState);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const handleSubmit = (values) => {
        userStore.updateCurrentUser(values,
            () => {
                enqueueSnackbar('פרופיל משתמש עודכן', {variant: 'success'});
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

    return (
        <Container maxWidth="md">
            <PaperWithHeader>
                <PaperHeader>
                    <PaperHeaderSection align="center" justify="center">
                        <Typography align="center"variant="h5">
                            פרופיל
                        </Typography>
                    </PaperHeaderSection>
                </PaperHeader>
                <PaperBody>
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        <TextField
                            error={formik.touched.avatar && formik.errors.avatar}
                            helperText={formik.touched.avatar && formik.errors.avatar}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="avatar"
                            label="תמונת פרופיל"
                            name="avatar"
                            autoComplete="avatar"
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
                            autoComplete="banner"
                            onChange={formik.handleChange}
                            value={formik.values.banner}
                        />
                        <TextField
                            error={formik.touched.about && formik.errors.about}
                            helperText={formik.touched.about && formik.errors.about}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="about"
                            label="אודות"
                            name="about"
                            autoComplete="about"
                            onChange={formik.handleChange}
                            value={formik.values.about}
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
                </PaperBody>
            </PaperWithHeader>
        </Container>
    )
}

export default observer(ProfileContianer);