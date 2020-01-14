import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Header from './header';
import AddImageAnchor from './Add/AddImageAnchor';
import AddNew from './AddNew.jsx';
import Update from './Update/Update';
import Register from './form/form';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './Add/theme';



export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Router>
      <div>
        <Header/>
      </div>
      <br />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/addanchor">
          <AddImageAnchor/>
        </Route>
        <Route path="/editanchor/:id" children={<AddImageAnchor/>} />
         
        <Route exact path="/addnew">
          <AddNew/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>

        <Route path="/update/:id" children={<Update />} />
      </Switch>
    </Router>
    </MuiThemeProvider>
  )
}