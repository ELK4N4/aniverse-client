import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@material-ui/core/';
import Header from "./components/Header/Header";
import Animes from "./components/Animes/Animes";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getAnimes } from './actions/animes'

import Form from './components/Auth/Form';
import AddAnimeForm from './components/AddAnimeForm/AddAnimeForm';


// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: 'rtl',
  shape: {
    borderRadius: 30,
  }, 
  palette: {
    primary: red,
  }
})

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(getAnimes());
  }, [dispatch])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>

          <Header />
          
          <Switch>
            <Route exact path={["/", "/home"]}>
              <MuiLink component={Link} to='animes' href="#" variant="body2">
                  Animes
              </MuiLink>
            </Route>
            <Route exact path={["/login", "/register"]}>
              <Form />
            </Route>
            <Route exact path="/animes">
              <Animes />
            </Route>
            <Route exact path="/add-anime">
              <AddAnimeForm />
            </Route>
          </Switch>


        </StylesProvider>
      </ThemeProvider>
    </Router>
  )
}