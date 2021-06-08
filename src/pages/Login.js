import React, {useEffect} from 'react';
import {useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { clearState } from "../redux/slices/UserSlice"
import { userLogin } from "../redux/services"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const validationSchema = yup.object().shape({
    identifier: yup.string().required("email or username is required"),
    password: yup.string().required("password is required"),
  });

const Login = () => {

    let history = useHistory();
    const dispatch = useDispatch();
    const { isLoading, isLogged, isError} = useSelector(state => state.user);

    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(validationSchema)
      });

    
  
    const onSubmit = (data) => {
        dispatch(userLogin(data));
    }


    useEffect(() => {
        return () => {
          dispatch(clearState());
        };
      }, []);


    useEffect(() => {
        reset()
        if (isError) {
            setTimeout(() => dispatch(clearState()), 5000)
        }
    
        if (isLogged) {
          dispatch(clearState());
          history.push('/');
        }
      }, [isError, isLogged]);


    return (
        <div className="login-form-wrapper">

            <span className="login-header">Login</span>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <input placeholder="Email or Username" type="text" {...register("identifier")} />
                <p className="form-error">{errors.identifier?.message}</p>
                    
                <input placeholder="Password" type="password" {...register("password")} />
                <p className="form-error">{errors.password?.message}</p>
                
                <button type="submit" className="login-btn">{isLoading ? 'Loading...' : "Login"} </button>
            </form>

            <div className="login-form-option" >
                <p>or</p>
                <Link to="/register"> create an account </Link>
            </div>

            {isError && <div> Error </div>}
        </div>

    );
}
 
export default Login;