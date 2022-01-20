import React, { useEffect } from "react";
import leftArrowIcon from "../../assets/left-arrow.svg";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { clearState, clearErrorMsg } from "../../redux/slices/UserSlice";
import { userRegister } from "../../redux/services";
import { registerSchema } from "../../helpers";
import styles from "./LoginRegister.module.scss";

const Register = () => {
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
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    const { username, email, password } = data;
    dispatch(userRegister({ username, email, password }));
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
      <Link to="/login">
        <img
          className={styles.backToLogin}
          src={leftArrowIcon}
          alt="left-arrow"
        />
      </Link>

      <span className={styles.loginHeader}>Create an new account</span>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div>
          <input placeholder="Username" type="text" {...register("username")} />
          <p className={styles.formError}>{errors.username?.message}</p>
        </div>

        <div>
          <input placeholder="Email" {...register("email")} />
          <p className={styles.formError}>{errors.email?.message}</p>
        </div>

        <div>
          <input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <p className={styles.formError}>{errors.password?.message}</p>
        </div>
        <div>
          <input
            placeholder="Repeat Password"
            type="password"
            {...register("rePassword")}
          />
          <p className={styles.formError}>{errors.rePassword?.message}</p>
        </div>
        <button type="submit" className={styles.loginBtn}>
          {isLoading ? "Loading..." : "Create"}
        </button>
      </form>

      <div className={styles.infoMessage}>
        {isError && <div> {errorMsg} </div>}
      </div>
    </div>
  );
};

export default Register;
