import "./styles/App.scss"
import "./styles/Form.scss"
import React from 'react';
import Login from "./pages/Login"
import Register from "./pages/Register"
import ToDoList from "./pages/ToDoList"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


export const ProtectedRoute = ({ children, ...rest }) => {

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

export const NotFound = () => {

  return(
    <div>
      <p>Not found</p>
    </div>
  );
  
};


export default function App() {

  
  return (
    <Router>
      <div className="App">

          <div className="app-name">
            <h1>ToDo-List</h1>
          </div>
          
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register}/>
          <ProtectedRoute exact path="/"> <ToDoList/> </ProtectedRoute>
          <Route component={NotFound} />
        </Switch>

      </div>
    </Router>
  );
}

