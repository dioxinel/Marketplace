import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../routes';
import Register from './Register/Register';
import Login from './Login/Login';
import ResetPassword from './ResetPassword/ResetPassword';

function Auth() {
  return (
    <div>
      <Switch>
        <Route path={routes.login} component={Login} />
        <Route path={routes.register} component={Register} />
        <Route
          path={routes.resetPassword}
          component={ResetPassword}
        />
      </Switch>
    </div>
  );
}

export default Auth;
