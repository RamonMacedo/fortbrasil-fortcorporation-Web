import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import NotFound from '../pages/NotFound';

import Dashboard from '../pages/Dashboard';
import Establishments from '../pages/Establishments';
import EstablishmentsCreate from '../pages/Establishments/EstablishmentsCreate';
import EstablishmentsUpdate from '../pages/Establishments/EstablishmentsUpdate';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />

      {/* Private Routes */}
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route
        exact
        path="/establishments"
        component={Establishments}
        isPrivate
      />
      <Route
        exact
        path="/establishments/create"
        component={EstablishmentsCreate}
        isPrivate
      />
      <Route
        exact
        path="/establishments/update"
        component={EstablishmentsUpdate}
        isPrivate
      />

      <Route exact path="/404" notFound component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  );
};

export default Routes;
