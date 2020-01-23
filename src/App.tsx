import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Header from './header';
import AddImageAnchor from './Add/AddImageAnchor';
import AddNew from './AddNew.jsx';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './Add/theme';
import Login from './login/login';
import { ConfigProvider, config } from './ConfigContext';
import { SnackbarProvider } from 'notistack';
import Register from './register/register';

export default function App() {
  const getUsername = () => {
    return 'te'
}
  const h = () => {
    console.log('parent fn')
  }
  
  return (
    <MuiThemeProvider theme={theme}>
      <ConfigProvider value={config}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <div>
              <Header logout={h} username={getUsername()}/>
            </div>
            <br />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/addanchor">
                <AddImageAnchor />
              </Route>
              <Route path="/editanchor/:id" children={<AddImageAnchor />} />

              <Route exact path="/addnew">
                <AddNew />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
            </Switch>
          </Router>
        </SnackbarProvider>
      </ConfigProvider>
    </MuiThemeProvider>
  )
}