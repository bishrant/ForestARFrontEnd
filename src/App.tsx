import React, { useEffect } from 'react';
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
import { PrivateRoute } from './components/ProtectedRoute.jsx';




export const App = (props: any) => {
  const dispatch = useDispatch();
  const verifyToken = async () => {
    if (loadState() !== null && typeof loadState() !== 'undefined' && typeof loadState().user !== "undefined") {
      if (typeof loadState().user.token === 'undefined') {
        return false;
      }
      const _data = loadState().user;
        const d = {"firstName": _data.firstName, "token": _data.token}
        dispatch(signinUser(d))

      // const token = loadState().user.token;
      const data: any = JSON.stringify({ "token": _data.token })
      const isValid = await fetch("http://localhost:5000/verifyToken", {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // @todo read the response body not just the overall code
      console.log(isValid);
      if (!isValid) {
        console.log('invalid')
        dispatch(logout());
        
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
              <PrivateRoute exact path="/">
                <Home />
              </PrivateRoute>
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