import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./config"


export const userLogin = createAsyncThunk(
    "user/login",

    async ({ identifier, password }, thunkAPI) => {


        try {

            const response = await axios.post("auth/local", { identifier, password });

            const data = response.data

            console.log(response)
            console.log(response.status)
            console.log(data)

            if (response.status === 200) {
                localStorage.setItem('token', data.jwt);
                return { ...data };
            } else {
                return thunkAPI.rejectWithValue(...data);
            }

        }catch(e){
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
        
    }

)

export const userRegister = createAsyncThunk(
    "user/register",

    async ({ username, email, password }, thunkAPI) => {


        try {

            const response = await axios.post("auth/local/register", { username, email, password });

            const data = response.data

            console.log(response)
            console.log(response.status)
            console.log(data)

            if (response.status === 200) {
                localStorage.setItem('token', data.jwt);
                return { ...data };
            } else {
                console.log('Error', response.status);
                console.log('Error', response.data);
                return thunkAPI.rejectWithValue(...data);
            }

        }catch(e){
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
        
    }

)

export const fetchUserToDoLists = createAsyncThunk(
    "user/todos",

    async ({ token }, thunkAPI) => {


        try {

            const response = await axios.get("to-do-lists",{
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            const data = response.data

            console.log(response)
            console.log(data)

            if (response.status === 200) {
                return data;
            } else {
                console.log('Error', response.status);
                console.log('Error', response.data);
                return thunkAPI.rejectWithValue(...data);
            }

        }catch(e){
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
        
    }

)