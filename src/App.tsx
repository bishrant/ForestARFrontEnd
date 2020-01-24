import React from 'react';
import './shared/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/header';
import AddImageAnchor from './components/AddImageAnchor';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './shared/theme';
import Login from './components/login';
import { ConfigProvider, config } from './utils/ConfigContext';
import { SnackbarProvider } from 'notistack';
import Register from './components/register';
import { loadState } from './utils/StateLoader';
import { logout, signinUser } from './actions/userActions';
import { useDispatch } from 'react-redux';

export default function App() {
  const dispatch = useDispatch();
  const verifyToken = async () => {
    if (loadState() !== null && typeof loadState() !== 'undefined' && typeof loadState().user !== "undefined") {
      if (typeof loadState().user.token === 'undefined') {
        return false;
      }
      const token = loadState().user.token;
      const data: any = JSON.stringify({ "token": token })
      const isValid = await fetch("http://localhost:5000/verifyToken", {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!isValid) {
        dispatch(logout())
      } else {
        const data = loadState().user;
        const d = {"firstName": data.firstName, "token": data.token}
        dispatch(signinUser(d))
      }

    }
  }
  verifyToken();

  return (
    <MuiThemeProvider theme={theme}>
      <ConfigProvider value={config}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <div>
              <Header />
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