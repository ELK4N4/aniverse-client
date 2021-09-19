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
import { Grow, Slide, Paper } from '@material-ui/core';
import useStyles from './style';
import { useStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { Alert, AlertTitle } from '@material-ui/lab';

const initialState = { username: '', email: '', password: '', confirmPassword: '' };

function Form() {
    const [form, setForm] = useState(initialState);
    const { userStore } = useStore();
    const classes = useStyles();
    let location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    const [isRegister, setIsRegister] = useState(location.pathname === '/register');
    const [isSlide, setIsSlide] = useState(true);
    const [title, setTitle] = useState(isRegister ? 'כניסה' : 'הרשמה');
    
    useEffect(() => {
        if(userStore.state === 'done') {
            history.push(redirect || '/');
            userStore.resetState();
        }
        setIsRegister(location.pathname === '/register');
        setTimeout(() => {if(location.pathname === '/register' || location.pathname === '/login'){setIsSlide(true); changeTitle(); document.getElementById("email")?.focus();}} , 400);
    }, [location.pathname, userStore.state]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegister) {
            userStore.register({email: form.email, username: form.username, password: form.password});
        } else {
            userStore.login({email: form.email, password: form.password});
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const changeTitle = () => {
        setTitle('כניסה');
        if(location.pathname === '/register') {
            setTitle('הרשמה');
        }
    }

    return (
        <Grow in>
            <Container component="main" maxWidth="xs" className={classes.root}>
            <CssBaseline />
            {redirect && 
                <>
                    <Alert variant="filled" severity="info">
                        <strong>עליך להתחבר כדי להמשיך</strong>
                    </Alert>
                    <br />
                </>
            }
            <Paper elevation={5} className={classes.paper}>
                <Slide direction="down" in={isSlide} timeout={450}>
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                </Slide>
                <Slide direction="left" in={isSlide}>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="כתובת אימייל"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        { isRegister && (
                        <>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="שם משתמש"
                                name="username"
                                autoComplete="username"
                                onChange={handleChange}
                            />
                        </>
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="סיסמא"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        { isRegister && (
                        <>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="אימות סיסמה"
                                name="password"
                                type="password"
                                autoComplete="password"
                                onChange={handleChange}
                            />
                        </>
                        )}
                        { !isRegister && (
                        <>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="זכור אותי"
                            />
                        </>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {isRegister ? "הרשם" : "התחבר"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                { !isRegister && (
                                <>
                                    <MuiLink href="#" variant="body2">
                                        שכחת סיסמא?
                                    </MuiLink>
                                </>
                                )}
                            </Grid>

                            <Grid item>
                                <MuiLink component={Link} to={isRegister ? '/login' : '/register'} onClick={()=> setIsSlide(false)} href="#" variant="body2">
                                    {isRegister ? "יש לך חשבון? התחבר" : "אין לך חשבון? הירשם!"}
                                </MuiLink>
                            </Grid>
                        </Grid>
                    </form>
                </Slide>
            </Paper>
            </Container>
        </Grow>
    );
}

export default observer(Form);