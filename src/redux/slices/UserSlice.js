import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister, fetchUserToDoLists } from "../services"
import { SORT } from "../../helpers"


export const userSlice = createSlice({

    name:"user",

    initialState: {
        email: "",
        login: "",
        isLoading: false,
        isLogged: false,
        isError: false,
        errorMsg: "",
        todoLists: [],
        filteredTodoLists: []
    },

    reducers: {

        clearState: state => {

            state.isLoading = false;
            state.isLogged = false;
            state.isError = false;
            state.errorMsg = "";

            return state;
        },

        sortToDoListsBy: (state, {payload}) => {

            switch(payload){
                case SORT.ALPH:{
                    state.todoLists.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                    break
                }
                case SORT.BY_DONE:{
                    state.todoLists.sort((a,b) => {

                        const aDoneTasks = a.task.filter(task => task.isDone).length
                        const bDoneTasks = b.task.filter(task => task.isDone).length

                        return aDoneTasks > bDoneTasks ? -1 : 1
                    })
                    break
                }
                case SORT.BY_UNDONE:{
                    state.todoLists.sort((a,b) => {

                        const aUdoneTasks = a.task.filter(task => !task.isDone).length
                        const bUnoneTasks = b.task.filter(task => !task.isDone).length

                        return aUdoneTasks > bUnoneTasks ? -1 : 1
                    })
                    break
                }

                default:{
                    state.todoLists.sort((a,b) => a.created_at < b.created_at ? 1 : -1)
                    break
                }

            }
        },

        searchToDoList: (state, {payload}) => {
            if(payload.length > 0)
                state.filteredTodoLists = state.todoLists.filter( task => task.name.search(payload) !== -1 && task )
            else
                state.filteredTodoLists = state.todoLists
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
            state.filteredTodoLists = payload
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
export const { clearState, sortToDoListsBy, searchToDoList } = actions;
export default reducer;
