import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logout from "../../assets/logout.svg";
import { cleanWholeState } from "../../redux/slices/UserSlice";
import styles from "./Header.module.scss";

const Header = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(cleanWholeState());
    history.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>ToDo-List</h1>
      </div>

      <div onClick={handleLogout} className={styles.logout}>
        {isLogged && <img src={logout} alt="door-icon" />}
      </div>
    </header>
  );
};

export default Header;
