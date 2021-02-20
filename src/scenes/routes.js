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
import { ProductView } from './ProductView/ProductDescription/ProductView.js';
import AddProduct from './ProductView/AddProduct/AddProduct.js';
import Header from 'src/components/Header/Header';
import { UserProducts } from './ProductView/UserProducts/UserProducts.js';
import { InboxView } from './Inbox/InboxView.js';
import { EditProfileView } from './EditProfile/EditProfileView.js';
import ProductHeader from 'src/components/Header/ProductHeader.js';
import SearchProductList from './ProductView/Search/SearchProductList.js';


export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  resetPassword: '/auth/reset-password',
  product: '/products/:productId',
  newProduct: '/product/add',
  userProducts: '/user/:userId/products',
  chat: '/inbox/:chatId',
  inbox: '/inbox',
  editProfile: '/user/edit-profile',
  searchProducts: '/product/search'
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
      <ProductHeader />
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.product} exact component={ProductView} />
        <Route path={routes.userProducts} component={UserProducts} />
        <Route path={routes.newProduct} component={AddProduct} />
        <Route path={routes.inbox} component={InboxView} />
        <Route path={routes.editProfile} component={EditProfileView} />
        <Route path={routes.searchProducts} component={SearchProductList} />
        <PrivateRoute path={routes.auth} component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
