import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, withRouter, Switch, Route } from 'react-router-dom';
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
import Activate from './components/Activate';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import {useHistory } from 'react-router-dom'

const App = (props: any) => {
  const dispatch = useDispatch();
  const verifyToken = async () => {
    const localData = loadState();
    if (localData !== null && typeof localData !== 'undefined' && typeof localData.user !== "undefined") {
      const userLocalStorage = loadState().user;
      if (userLocalStorage === null || typeof userLocalStorage === 'undefined') {
        return false;
      } 
      if (typeof userLocalStorage.token === 'undefined') {
        return false;
      }
      const _data = localData.user;
      const d = { "firstName": _data.firstName, "token": _data.token }
      dispatch(signinUser(d))

      const data: any = JSON.stringify({ "token": _data.token })
      const isValid = await fetch("/verifyToken", {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!isValid) {
        console.log('invalid')
        dispatch(logout());
      } else {
        const data = localData.user;
        const d = { "firstName": data.firstName, "token": data.token }
        dispatch(signinUser(d))
      }

    }
  }
  verifyToken();

  const [currentPath, setCurrentPath] = useState(props.location.pathname);

  const lg = async () => {
    dispatch(logout())
  }

  useEffect(() => {
    const { pathname } = props.location;
    console.log("New path:", pathname);
    if (pathname === '/login') {
      console.log(pathname);
      lg();
    }
    setCurrentPath(pathname);
  }, [props.location.pathname]);

  const notistackRef:any = React.createRef();

  const CustomSnackBar = (props: any) => {
    const { children, ...others } = props;
    return <SnackbarProvider maxSnack={3} ref={notistackRef}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      {...others}>
      {children}
    </SnackbarProvider>
  }


  return (
    <MuiThemeProvider theme={theme}>
      <ConfigProvider value={config}>
        <CustomSnackBar>
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
              <Route exact path="/forgotpassword">
                <ForgotPassword />
              </Route>
              <Route exact path="/resetpassword/:token">
                <ResetPassword />
              </Route>
              <Route exact path="/activate/:token">
                <Activate />
              </Route>
              <Route exact path="/changepassword">
                <ChangePassword />
              </Route>
            </Switch>
          </Router>
        </CustomSnackBar>
      </ConfigProvider>
    </MuiThemeProvider>
  )
}

export default withRouter(App)