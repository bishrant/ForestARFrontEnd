import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/header';
import AddImageAnchor from './components/AddImageAnchor';
import { MuiThemeProvider, Button } from '@material-ui/core';
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

export const App = (props: any) => {
  const dispatch = useDispatch();
  const verifyToken = async () => {
    if (loadState() !== null && typeof loadState() !== 'undefined' && typeof loadState().user !== "undefined") {
      if (typeof loadState().user.token === 'undefined') {
        return false;
      }
      const _data = loadState().user;
      const d = { "firstName": _data.firstName, "token": _data.token }
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
        const d = { "firstName": data.firstName, "token": data.token }
        dispatch(signinUser(d))
      }

    }
  }
  verifyToken();

  const notistackRef:any = React.createRef();
  const onClickDismiss = (key: any) => () => {
    notistackRef.current.closeSnackbar(key);
  }
  const CustomSnackBar = (props: any) => {
    const { children, ...others } = props;
    return <SnackbarProvider maxSnack={3} ref={notistackRef}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      action={(key: any) => (
        <Button onClick={onClickDismiss(key)}>
          X
      </Button>
      )}
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
              <Route exact path="/forgotpassword">
                <ForgotPassword />
              </Route>
              <Route exact path="/resetpassword/:token">
                <ResetPassword />
              </Route>
              <Route exact path="/activate/:token">
                <Activate />
              </Route>
            </Switch>
          </Router>
        </CustomSnackBar>
      </ConfigProvider>
    </MuiThemeProvider>
  )
}