import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Header from './header';
import AddImageAnchor from './AddImageAnchor';



export default function App() {
  return (
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
        
      </Switch>
    </Router>
  )
}