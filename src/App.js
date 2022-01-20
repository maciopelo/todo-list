import "./styles/App.scss";
import "./styles/Form.scss";
import React, { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToDoList from "./pages/ToDoList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import {
  setPreviouslyLoggedUser,
  cleanWholeState,
} from "./redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import doorIcon from "./assets/door.svg";
import rightArrowIcon from "./assets/arrow.svg";

export default function App() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(cleanWholeState());
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setPreviouslyLoggedUser(user));
    }
  }, [dispatch]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <div className="app-name">
          <h1>ToDo-List</h1>
        </div>

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/">
            <ToDoList />
          </ProtectedRoute>
          <Route component={NotFound} />
        </Switch>

        {isLogged && (
          <div className="logout-button" onClick={handleLogout}>
            <img className="door-icon" src={doorIcon} alt="door-icon" />
            <img
              className="right-arrow-icon"
              src={rightArrowIcon}
              alt="right-arrow-icon"
            />
          </div>
        )}
      </div>
    </Router>
  );
}
