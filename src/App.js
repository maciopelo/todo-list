import React, { useEffect } from "react";
import Login from "./pages/LoginRegister/Login";
import Register from "./pages/LoginRegister/Register";
import ToDoList from "./pages/ToDoList/ToDoList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { setPreviouslyLoggedUser } from "./redux/slices/UserSlice";
import { useDispatch } from "react-redux";
import Header from "./components/Header/Header";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setPreviouslyLoggedUser(user));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/">
            <ToDoList />
          </ProtectedRoute>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
