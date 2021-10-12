import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Box, Button, Container, Divider, FormHelperText, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import EditMemberDialog from './EditMemberDialog';
import { Skeleton } from '@material-ui/lab';
import AddMemberDialog from './AddMemberDialog';
import { toJS } from 'mobx';
import FansubCard from '../../../Cards/FansubCards/FansubCard';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { fansubScheme } from '@aniverse/utils/validations';


function SettingsContainer() {
    const store = useStore();
    const { fansubStore } = store;
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [form, setForm] = useState({ name: fansubStore.fansub.name, avatar: fansubStore.fansub.avatar, banner: fansubStore.fansub.banner });
    const initFansub = { name: fansubStore.fansub.name, avatar: fansubStore.fansub.avatar, banner: fansubStore.fansub.banner }

    const handleSubmit = (values) => {
        fansubStore.updateFansub(values,
            () => {
                enqueueSnackbar('פרטי פאנסאב עודכנו', {variant: 'success'});
            },
            (error) => {
                enqueueSnackbar(error, {variant: 'error'});
            }
        );
    };
    
    const formik = useFormik({ initialValues: initFansub,
        enableReinitialize: true,
        validateOnBlur: true,
        onSubmit: handleSubmit,
        validationSchema: fansubScheme
    });

    const leaveFansub = async () => {
        if (window.confirm("לעזוב את הפאנסאב " + fansubStore.fansub.name + "?")) {
            alert('leaveFansub');
        }
    };

    const deleteFansub = async () => {
        if (window.confirm("למחוק את הפאנסאב " + fansubStore.fansub.name + "?")) {
            store.startLoading();
            try {
                await api.deleteFansub(fansubStore.fansub._id);
                history.push('/my-fansubs');
            } catch (err) {
                console.error(err.response);
            } finally {
                store.stopLoading();
            }
        }
    };

    return (
        <>
            <Container maxWidth="lg">
                <Paper elevation={5} className={classes.paper}>
                    <Typography align="center" component="h1" variant="h5" className={classes.title}>
                        הגדרות
                    </Typography>

                    {store.loading ?
                        <>
                            <Typography variant="h4">
                                <Skeleton />
                            </Typography>
                            <Typography variant="h4">
                                <Skeleton />
                            </Typography>
                            <Typography variant="h4">
                                <Skeleton />
                            </Typography>
                        </>
                        :
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={formik.touched.name && formik.errors.name}
                                    helperText={formik.touched.name && formik.errors.name}
                                    onBlur={formik.handleBlur}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="שם פאנסאב"
                                    name="name"
                                    autoComplete="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name || ''}
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
                                    label="תמונת פאנסאב"
                                    name="avatar"
                                    autoComplete="avatar"
                                    onChange={formik.handleChange}
                                    value={formik.values.avatar || ''}
                                />
                                <TextField
                                    error={formik.touched.banner && formik.errors.banner}
                                    helperText={formik.touched.banner && formik.errors.banner}
                                    onBlur={formik.handleBlur}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="banner"
                                    label="באנר"
                                    name="banner"
                                    autoComplete="banner"
                                    onChange={formik.handleChange}
                                    value={formik.values.banner || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography component="h6" variant="h5" align="center">
                                    תצוגה מקדימה
                                </Typography>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    >
                                    <FansubCard
                                        name={formik.values.name}
                                        img={formik.values.avatar ? formik.values.avatar : 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png'}
                                        showContent
                                        timeout={500}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    שמור
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={leaveFansub}
                                >
                                    צא מהפאנסאב
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={deleteFansub}
                                >
                                    מחק פאנסאב
                                </Button>
                            </Grid>
                            

                        </Grid>
                        
                    </form>
                    }

                </Paper>

            </Container>
        </>
    )
}

export default observer(SettingsContainer);