import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@material-ui/core/';
import Header from "./components/Header/Header";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

import Animes from "./components/pages/Animes";
import Anime from "./components/pages/Anime";
import Form from "./components/pages/Auth/Form";
import Fansubs from "./components/pages/Fansubs";
import Fansub from "./components/pages/Fansub";
import MyFansubs from "./components/pages/MyFansubs";
import MyFansub from "./components/pages/MyFansubs/MyFansub";

import AddAnimeForm from './components/AddAnimeForm/AddAnimeForm';
import CreateFansubForm from './components/CreateFansubForm/CreateFansubForm';
import Project from './components/pages/MyFansubs/MyFansub/Project';


// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: 'rtl',
  shape: {
    borderRadius: 30,
  },
  palette: {
    primary: red,
  },
  typography: {
    h1: {
      fontWeight: 600
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
    },
  },
})

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <ThemeProvider theme={theme}>
          <StylesProvider jss={jss}>

            <Header />
            
            <Switch>
              <Route exact path={["/", "/home"]}>
                <MuiLink component={Link} to='/animes' href="#" variant="body2">
                    Animes
                </MuiLink>
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
              <Route exact path={["/animes/:animeId", "/animes/:animeId/episodes/:episodeId"]}>
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
              <Route exact path= {["/my-fansubs/:fansubId", "/my-fansubs/:fansubId/project/:projectId"]}>
                <MyFansub />
              </Route>
            </Switch>


          </StylesProvider>
        </ThemeProvider>
      </Router>
    </SnackbarProvider>
  )
}