import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute, routes } from '../routes';
import Register from './Register/Register';
import Login from './Login/Login';
import ResetPassword from './ResetPassword/ResetPassword';

function Auth() {
  return (
    <div>
      <Switch>
        <PrivateRoute path={routes.login} component={Login} />
        <PrivateRoute path={routes.register} component={Register} />
        <PrivateRoute
          path={routes.resetPassword}
          component={ResetPassword}
        />
      </Switch>
    </div>
  );
}

export default Auth;
