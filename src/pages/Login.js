import React, {useEffect} from 'react';
import {useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { clearState } from "../redux/slices/UserSlice"
import { userLogin } from "../redux/services"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "../helpers"


const Login = () => {

    let history = useHistory();
    const dispatch = useDispatch();
    const { isLoading, isLogged, isError} = useSelector(state => state.user);

    const { register, 
            handleSubmit, 
            reset, 
            formState:{ errors } } = useForm({resolver: yupResolver(loginSchema)});

    
  
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

            
            <p>or</p>
  
            <Link to="/register" className="register-link"> create an account </Link>

            {isError && <div> Error </div>}
        </div>

    );
}
 
export default Login;