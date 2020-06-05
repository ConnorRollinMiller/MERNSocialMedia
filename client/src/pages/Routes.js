import React, { lazy, Suspense } from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Loading from '../components/common/Loading';
import PublicRoute from '../components/routing/PublicRoute';
import PrivateRoute from '../components/routing/PrivateRoute';

const LoginPage = lazy(() => import('./LoginPage'));
const RegisterPage = lazy(() => import('./RegisterPage'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const HomePage = lazy(() => import('./HomePage'));
const ProfilePage = lazy(() => import('./ProfilePage'));

const Routes = () => {
   return (
      <Suspense fallback={<Loading />}>
         <Switch>
            <PublicRoute path='/login' component={LoginPage} />
            <PublicRoute path='/register' component={RegisterPage} />
            <PrivateRoute path='/profile/:username' component={ProfilePage} />
            <PrivateRoute exact path='/' component={HomePage} />
            <Route path='*' component={PageNotFound} />
         </Switch>
      </Suspense>
   );
};

Routes.propTypes = {};

export default Routes;
