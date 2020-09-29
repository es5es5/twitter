import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({isLoggedIn}) => {
  // eslint-disable-next-line
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {
        isLoggedIn ?
        (
          <>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        )
        :
        (
          <>
            <Route exact path="/">
              <Auth></Auth>
            </Route>
            <Redirect from="*" to="/"></Redirect>
          </>
        )
        }
      </Switch>
    </Router>
  )
}

export default AppRouter