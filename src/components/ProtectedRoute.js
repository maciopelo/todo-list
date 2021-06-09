import React from 'react';
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({ children, ...rest }) => {

    return(
      <Route {...rest} render={({location}) => {
        return Boolean(localStorage.getItem("token"))
          ? children
          :  <Redirect to={{ pathname: '/login', state: { from: location } }} />
        }
      }
      />
    );
    
  };

export default ProtectedRoute