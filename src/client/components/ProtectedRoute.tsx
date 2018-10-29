import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './AuthContext';
import Loading from './Loading';

const ProtectedRoute = ({ component: Component, ...rest }: any) => (
  <AuthConsumer>
    {({ isAuth, loading }) => (
      <Route
        render={
          props =>
            loading ? <Loading /> : isAuth
              ? <Component {...props} />
              : <Redirect to="/login" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
);

export default ProtectedRoute;
