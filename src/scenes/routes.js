import {
  Switch,
  BrowserRouter,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './Home/Home.js';
import Auth from './Auth/Auth.js';
import React from 'react';
import { useStore } from 'src/stores/createStore.js';
import { observer } from 'mobx-react';
import { ProductView } from './ProductView/ProductView.js';
import AddProduct from './ProductView/AddProduct.js';
import Header from 'src/components/Header/Header';
export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  resetPassword: '/auth/reset-password',
  product: '/products/:productId',
  newProduct: '/product/add',
};

export const PrivateRoute = observer(
  ({ component: Component, ...props }) => {
    const store = useStore();
    if (store.viewer.isLoggedIn) {
      return <Redirect to={routes.home} />;
    } else {
      return (
        <Route
          {...props}
          render={(routeProps) => <Component {...routeProps} />}
        />
      );
    }
  },
);

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.product} component={ProductView} />
        <Route path={routes.newProduct} component={AddProduct} />
        <PrivateRoute path={routes.auth} component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
