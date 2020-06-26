import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthProvider } from '../utils/useContext';

const PrivateRoute = ({ component: RouteComponent, ...rest}: any) => {
    const { verified } = useContext(AuthProvider);
  
   return (
      <Route
        {...rest}
        render={routeProps =>
        verified ? (
         <RouteComponent {...routeProps} />
        ) : (
         <Redirect to={{pathname: "/", state: {prevPath:  rest.path}}} />
       )
      }
     />
    );
  }
  export default PrivateRoute