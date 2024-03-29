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

import Animes from "./pages/Animes";
import Notifications from "./pages/Notifications";
import Anime from "./pages/Anime";
import UserSettings from "./pages/UserSettings";
import Form from "./pages/Auth/Form";
import Fansubs from "./pages/Fansubs";
import Fansub from "./pages/Fansub";
import MyFansubs from "./pages/MyFansubs";
import MyFansub from "./pages/MyFansubs/MyFansub";

import AddAnimeForm from './components/AddAnimeForm/AddAnimeForm';
import CreateFansubForm from './components/CreateFansubForm/CreateFansubForm';
import Project from './pages/MyFansubs/MyFansub/Project';
import User from './pages/User';
import Home from './pages/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import Admin from './pages/Admin';
import UserRoute from './components/UserRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Error404 from './pages/Error404';
import Sandbox from './pages/Sandbox';
import ScrollToTop from './hooks/ScrollToTop';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

let lightTheme = createTheme ({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          // backgroundImage: "url('https://image.shutterstock.com/image-vector/abstract-background-white-film-strip-260nw-1311813134.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "100%",
        },
      },
    },
  },
  direction: 'rtl',
  shape: {
    borderRadius: 30,
  },
  palette: {
    primary: red,
    type: 'light',
    background: {
      default: '#edf1f5'
    }
  },
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif',
    ].join(','),
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
    fontFamily: [
      'Open Sans',
      'sans-serif',
    ].join(','),
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
          <ScrollToTop />
          <CssBaseline />
          <StylesProvider jss={jss}>
            <Header toggleTheme={toggleTheme} themeIcon={themeIcon}/>
              <Switch>
                <Route exact path={["/", "/home"]}>
                  <Home />
                </Route>
                <UserRoute exact path={"/notifications"}>
                  <Notifications />
                </UserRoute>
                <Route exact path={["/login", "/register"]}>
                  <Form />
                </Route>
                <Route exact path="/forgot-password">
                  <ForgotPassword />
                </Route>
                <Route exact path="/reset-password">
                  <ResetPassword />
                </Route>
                <Route exact path="/animes">
                  <Animes />
                </Route>
                <UserRoute exact path="/animes/add">
                  <AddAnimeForm />
                </UserRoute>
                <Route exact path={["/animes/:animeId", "/animes/:animeId/episodes", "/animes/:animeId/episodes/:episodeId"]}>
                  <Anime />
                </Route>
                <Route exact path="/fansubs">
                  <Fansubs />
                </Route>
                <UserRoute exact path="/fansubs/add">
                  <CreateFansubForm />
                </UserRoute>
                <Route exact path="/fansubs/:fansubId">
                  <Fansub />
                </Route>
                <UserRoute exact path="/my-fansubs">
                  <MyFansubs />
                </UserRoute>
                <Route exact path="/users/:userId">
                  <User />
                </Route>
                <UserRoute exact path= {["/admin/"]}>
                  <Admin />
                </UserRoute>
                <UserRoute exact path={["/my-fansubs/:fansubId", "/my-fansubs/:fansubId/project/:projectId"]}>
                  <MyFansub />
                </UserRoute>
                <UserRoute exact path="/user/settings">
                  <UserSettings />
                </UserRoute>
                <Route >
                  <Sandbox />
                </Route>
                <Route >
                  <Error404 />
                </Route>
              </Switch>
          </StylesProvider>
        </ThemeProvider>
      </Router>
    </SnackbarProvider>
  )
}