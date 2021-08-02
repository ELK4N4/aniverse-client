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


function SettingsContainer() {
    const store = useStore();
    const { fansubStore } = store;
    const classes = useStyles();
    const [form, setForm] = useState({ name: fansubStore.fansub.name, image: fansubStore.fansub.image });

    useEffect(() => {
        setForm({ name: fansubStore.fansub.name, image: fansubStore.fansub.image });
    }, [store.loading])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        fansubStore.updateFansub(form);
    };

    const leaveFansub = () => {
        alert('leaveFansub')
    };

    const deleteFansub = () => {
        alert('deleteFansub')
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
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="שם פאנסאב"
                                    name="name"
                                    autoComplete="name"
                                    onChange={handleChange}
                                    defaultValue={fansubStore.fansub.name}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="image"
                                    label="תמונת פאנסאב"
                                    name="image"
                                    autoComplete="image"
                                    onChange={handleChange}
                                    defaultValue={fansubStore.fansub.image}
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
                                    name={form.name}
                                    img={form.image ? form.image : 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png'}
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