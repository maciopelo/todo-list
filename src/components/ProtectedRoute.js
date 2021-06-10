import React from 'react';
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({ children, ...rest }) => {

  const loggedInUser = localStorage.getItem("user");
  const foundUserToken = JSON.parse(loggedInUser);

    return(
      <Route {...rest} render={({location}) => {
        return Boolean(foundUserToken)
          ? children
          :  <Redirect to={{ pathname: '/login', state: { from: location } }} />
        }
      }
      />
    );
    
  };

export default ProtectedRoute