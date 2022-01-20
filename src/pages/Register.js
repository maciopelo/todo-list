import React, {useEffect} from 'react';
import leftArrowIcon from "../assets/left-arrow.svg"
import { useHistory, Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector} from 'react-redux';
import { clearState } from "../redux/slices/UserSlice"
import { userRegister } from "../redux/services"
import { registerSchema } from "../helpers"




const Register = () => {

    let history = useHistory();
    const dispatch = useDispatch();
    const { isLoading, isLogged, isError, errorMsg} = useSelector(state => state.user);
    
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(registerSchema)
      });

    const onSubmit = (data) => {
        const {username, email, password} = data;
        dispatch(userRegister({username, email, password}));
    }

    useEffect(() => {
        return () => {
          dispatch(clearState());
        };
      }, []);


    useEffect(() => {
        reset();
        
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

            <Link to="/login">
              <img className="back-to-login" src={leftArrowIcon} alt="left-arrow" />
            </Link>

            <span className="login-header">Create an new account</span>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form" >

                <input placeholder="Username" type="text" {...register("username")} />
                <p className="form-error" >{errors.username?.message}</p>

                <input placeholder="Email" {...register("email")} />
                <p className="form-error">{errors.email?.message}</p>
                    
                <input placeholder="Password" type="password" {...register("password")} />
                <p className="form-error" >{errors.password?.message}</p>

                <input placeholder="Repeat Password" type="password" {...register("rePassword")} />
                <p className="form-error" >{errors.rePassword?.message}</p>
                
                <button type="submit" className="login-btn">{isLoading ? 'Loading...' : "Create"}</button>
                
            </form>

            {isError && <div> {errorMsg} </div>}


        </div>

    );
}
 
export default Register;