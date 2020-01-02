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
        <Route path="/editanchor/:id" children={<AddImageAnchor/>} />
         
        <Route exact path="/addnew">
          <AddNew/>
        </Route>
        <Route path="/update/:id" children={<Update />} />
      </Switch>
    </Router>
  )
}