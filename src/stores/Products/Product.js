import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute, routes } from '../routes';
import Register from './Register/Register';
import Login from './Login/Login';
import ResetPassword from './ResetPassword/ResetPassword';
import AuthHeader from 'src/components/Header/AuthHeader';
import ProductHeader from 'src/components/Header/ProductHeader';
import Home from 'src/scenes/Home/Home';
import { ProductView } from 'src/scenes/ProductView/ProductDescription/ProductView';
import { UserProducts } from 'src/scenes/ProductView/UserProducts/UserProducts';

function Product() {
  return (
    <div>
      <ProductHeader />
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.product} component={ProductView} />
        <Route path={routes.userProducts} component={UserProducts} />
      </Switch>
    </div>
  );
}

export default Product;