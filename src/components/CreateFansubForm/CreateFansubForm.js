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


const initFansub = {
    name: '',
    avatar: ''
}

function CreateFansubForm() {
    const store = useStore();
    const history = useHistory();
    const classes = useStyles();
    const { funsubStore } = useStore();
    const [Fansub, setFansub] = useState(initFansub);

    useEffect(
        () =>
          autorun(() => {
            if(funsubStore.state === 'done') {
                history.push('/');
                runInAction(() => {
                    funsubStore.resetState();
                });
            }
        })
    ,[])
    
    const handleOnChange = (e) => {
        setFansub({...Fansub, [e.target.name]: e.target.value});
    };

     const handleSubmit = async (e) => {
        e.preventDefault();

        store.startLoading();
        try {
            const { data } = await api.addFansub(Fansub);
            console.log(data);
            history.push('/fansubs');
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    };


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
                        <form autoComplete="off" className={classes.form} noValidate onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="שם הפאנסאב"
                                name="name"
                                autoFocus
                                value={Fansub.name}
                                onChange={handleOnChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="avatar"
                                label="תמונה"
                                name="avatar"
                                autoComplete="off"
                                value={Fansub.englishName}
                                onChange={handleOnChange}
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

export default observer(CreateFansubForm);