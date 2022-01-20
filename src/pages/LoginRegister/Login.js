import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMsg,
  clearState,
  errorMsg,
} from "../../redux/slices/UserSlice";
import { userLogin } from "../../redux/services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../helpers";
import styles from "./LoginRegister.module.scss";

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, isLogged, isError, errorMsg } = useSelector(
    (state) => state.user
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      reset();
      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 3000);
    }

    if (isLogged) {
      dispatch(clearState());
      history.push("/");
    }
  }, [dispatch, isLogged, isError]);

  return (
    <div className={styles.loginFormWrapper}>
      <span className={styles.loginHeader}>Login</span>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div>
          <input
            placeholder="Email or Username"
            type="text"
            {...register("identifier")}
          />
          <p className={styles.formError}>{errors.identifier?.message}</p>
        </div>

        <div>
          <input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <p className={styles.formError}>{errors.password?.message}</p>
        </div>

        <button type="submit" className={styles.loginBtn}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>

      <p className={styles.orSeparator}>or</p>

      <Link to="/register" className={styles.registerLink}>
        create an account
      </Link>

      <div className={styles.infoMessage}>
        {isError && <div> {errorMsg} </div>}
      </div>
    </div>
  );
};

export default Login;
