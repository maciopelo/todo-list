import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister, fetchUserToDoLists } from "../services"


export const userSlice = createSlice({

    name:"user",

    initialState: {
        email: "",
        login: "",
        isLoading: false,
        isLogged: false,
        isError: false,
        errorMsg: "",
        todoLists: []
    },

    reducers: {

        clearState: state => {

            state.isLoading = false;
            state.isLogged = false;
            state.isError = false;
            state.errorMsg = "";

            return state;
        }

    },

    extraReducers: {

        [userLogin.fulfilled]: (state, {payload} ) => {
            console.log("fullfiled")
            state.email = payload.user.email;
            state.login = payload.user.username;
            state.isLoading = false;
            state.isLogged = true;
            state.isError = false;
        },

        [userLogin.pending]: (state) => {
            console.log("pending")
            state.isLoading = true;
        },

        [userLogin.rejected]: (state, {payload} ) => {
            console.log("rejected")
            state.isLoading = false;
            state.isLogged = false;
            state.isError = true;
            state.errorMsg = payload.message[0].messages[0].message

        },

        [userRegister.fulfilled]: (state, {payload} ) => {
            console.log("fullfiled")
            state.email = payload.user.email;
            state.login = payload.user.username;
            state.isLoading = false;
            state.isLogged = true;
            state.isError = false;
        },

        [userRegister.pending]: (state) => {
            console.log("pending")
            state.isLoading = true;
        },

        [userRegister.rejected]: (state, {payload} ) => {
            console.log("rejected")
            state.isLoading = false;
            state.isLogged = false;
            state.isError = true;
            state.errorMsg = payload.message[0].messages[0].message

        },

        [fetchUserToDoLists.fulfilled] : (state, {payload}) => {
            console.log("fullfiled")
            state.isLoading = false;
            state.todoLists = payload
        },

        [fetchUserToDoLists.pending] : (state) => {
            console.log("pending")
            state.isLoading = true;
        },

        [fetchUserToDoLists.rejected] : (state) => {
            console.log("rejected")
            state.isLoading = false;
        }

    }

})


const {reducer, actions} = userSlice;
export const { clearState } = actions;
export default reducer;
