import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './Home/Home.js';
import Auth from './Auth/Auth.js';
import React from 'react';

export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  resetPassword: '/auth/reset-password',
};

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.auth} component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export const all = () => {
  return null;
};

export default Router;
