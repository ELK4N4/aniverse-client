import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Link as MuiLink, responsiveFontSizes, withStyles } from '@material-ui/core/';
import Header from "./components/Header/Header";
import { createTheme , ThemeProvider, Box } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //needs to be BrowserRouter instead of HashRouter
import { SnackbarProvider, useSnackbar } from 'notistack';

import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

import Animes from "./components/pages/Animes";
import Anime from "./components/pages/Anime";
import UserSettings from "./components/pages/UserSettings";
import Form from "./components/pages/Auth/Form";
import Fansubs from "./components/pages/Fansubs";
import Fansub from "./components/pages/Fansub";
import MyFansubs from "./components/pages/MyFansubs";
import MyFansub from "./components/pages/MyFansubs/MyFansub";
import ManageAnimes from "./components/pages/ManageAnimes";

import AddAnimeForm from './components/AddAnimeForm/AddAnimeForm';
import CreateFansubForm from './components/CreateFansubForm/CreateFansubForm';
import Project from './components/pages/MyFansubs/MyFansub/Project';
import User from './components/pages/User';
import Home from './components/pages/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import Admin from './components/pages/Admin';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

let lightTheme = createTheme ({
  direction: 'rtl',
  shape: {
    borderRadius: 30,
  },
  palette: {
    primary: red,
    type: 'light',
  },
  typography: {
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
    },
  },
})

lightTheme = responsiveFontSizes(lightTheme);

let darkTheme = createTheme ({
  direction: 'rtl',
  shape: {
    borderRadius: 30,
  },
  palette: {
    primary: red,
    type: "dark",
    background: {
      paper: "#242424",
      default: "#171717",
    }
  },
  typography: {
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
    },
  },
})

darkTheme = responsiveFontSizes(darkTheme);

export default function App() {
  const [theme, setTheme] = useState(true);
  const themeIcon = !theme ? <Brightness7Icon /> : <Brightness4Icon />;
  const appliedTheme = createTheme(theme ? lightTheme : darkTheme);

  const toggleTheme = () => {
    setTheme(!theme);
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <ThemeProvider theme={appliedTheme}>
          <CssBaseline />
          <StylesProvider jss={jss}>
            <Header toggleTheme={toggleTheme} themeIcon={themeIcon}/>
              <Switch>
                <Route exact path={["/", "/home"]}>
                  <Home />
                </Route>
                <Route exact path={["/login", "/register"]}>
                  <Form />
                </Route>
                <Route exact path="/animes">
                  <Animes />
                </Route>
                <Route exact path="/animes/add">
                  <AddAnimeForm />
                </Route>
                <Route exact path={["/animes/:animeId", "/animes/:animeId/episodes", "/animes/:animeId/episodes/:episodeId"]}>
                  <Anime />
                </Route>
                <Route exact path="/fansubs">
                  <Fansubs />
                </Route>
                <Route exact path="/fansubs/add">
                  <CreateFansubForm />
                </Route>
                <Route exact path="/fansubs/:fansubId">
                  <Fansub />
                </Route>
                <Route exact path="/my-fansubs">
                  <MyFansubs />
                </Route>
                <Route exact path="/users/:userId">
                  <User />
                </Route>
                <Route exact path= {["/admin/"]}>
                  <Admin />
                </Route>
                <Route exact path= {["/my-fansubs/:fansubId", "/my-fansubs/:fansubId/project/:projectId"]}>
                  <MyFansub />
                </Route>
                <Route exact path="/user/settings">
                  <UserSettings />
                </Route>
                <Route exact path="/sandbox">
                  There is no Sandbox :(
                </Route>
              </Switch>
          </StylesProvider>
        </ThemeProvider>
      </Router>
    </SnackbarProvider>
  )
}