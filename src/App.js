import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile"

const PrivateRoute=({ component: Component, ...props})=>(
    <Route render={() =>
        localStorage.getItem('id')?  <Component/> :
            <Redirect to={{pathname : "/login"}}/>}/>
);
class App extends Component {
  render() {

    return (
        <Router>
          <Switch>
            <Route path='/' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <PrivateRoute path='/profile' component={Profile} />
          </Switch>
        </Router>
    )
  }
}
export default App;