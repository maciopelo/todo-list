import "./styles/App.scss"
import "./styles/Form.scss"
import React from 'react';
import Login from "./pages/Login"
import Register from "./pages/Register"
import ToDoList from "./pages/ToDoList"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./pages/NotFound"


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

