import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import SideBar from '../components/SideBar';

import { useAuth } from '../hooks/auth';
import { Container } from './styles';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  notFound?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  notFound = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <ReactDOMRoute
          {...rest}
          render={({ location }) => {
            return isPrivate === !!user ? (
              <Container>
                <SideBar />
                <Component />
              </Container>
            ) : (
              <>
                {notFound ? (
                  <>
                    <Component />
                  </>
                ) : (
                  <Redirect
                    to={{
                      pathname: isPrivate ? '/' : '/dashboard',
                      state: { from: location },
                    }}
                  />
                )}
              </>
            );
          }}
        />
      ) : (
        <ReactDOMRoute
          {...rest}
          render={({ location }) => {
            return !isPrivate ? (
              <Component />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            );
          }}
        />
      )}
    </>
  );
};

export default Route;
