import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userRegister,
  fetchUserToDoLists,
  removeUserToDoList,
} from "../services";
import { SORT } from "../../helpers";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    email: "",
    login: "",
    isLoading: false,
    isLogged: false,
    isError: false,
    errorMsg: "",
    todoLists: [],
    filteredTodoLists: [],
  },

  reducers: {
    clearState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMsg = "";

      return state;
    },

    cleanWholeState: (state) => {
      state.email = "";
      state.login = "";
      state.isLoading = false;
      state.isLogged = false;
      state.isError = false;
      state.errorMsg = "";
      state.todoLists = [];
      state.filteredTodoLists = [];
    },

    sortToDoListsBy: (state, { payload }) => {
      switch (payload) {
        case SORT.ALPH: {
          state.filteredTodoLists.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          );
          break;
        }
        case SORT.BY_DONE: {
          state.filteredTodoLists.sort((a, b) => {
            const aDoneTasks = a.tasks.filter((task) => task.isDone).length;
            const bDoneTasks = b.tasks.filter((task) => task.isDone).length;

            return aDoneTasks > bDoneTasks ? -1 : 1;
          });
          break;
        }
        case SORT.BY_UNDONE: {
          state.filteredTodoLists.sort((a, b) => {
            const aUdoneTasks = a.tasks.filter((task) => !task.isDone).length;
            const bUnoneTasks = b.tasks.filter((task) => !task.isDone).length;

            return aUdoneTasks > bUnoneTasks ? -1 : 1;
          });
          break;
        }

        default: {
          state.filteredTodoLists.sort((a, b) =>
            a.created_at < b.created_at ? 1 : -1
          );
          break;
        }
      }
    },

    searchToDoList: (state, { payload }) => {
      if (payload.length > 0)
        state.filteredTodoLists = state.todoLists.filter(
          (task) => task.name.toLowerCase().search(payload) !== -1 && task
        );
      else state.filteredTodoLists = state.todoLists;
    },

    setPreviouslyLoggedUser: (state, { payload }) => {
      state.email = payload.email;
      state.login = payload.login;
      state.isLogged = true;
    },
  },

  extraReducers: {
    [userLogin.fulfilled]: (state, { payload }) => {
      state.email = payload.user.email;
      state.login = payload.user.username;
      state.isLoading = false;
      state.isLogged = true;
      state.isError = false;
    },

    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },

    [userLogin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isLogged = false;
      state.isError = true;
      state.errorMsg = payload.message[0].messages[0].message;
    },

    [userRegister.fulfilled]: (state, { payload }) => {
      state.email = payload.user.email;
      state.login = payload.user.username;
      state.isLoading = false;
      state.isLogged = true;
      state.isError = false;
    },

    [userRegister.pending]: (state) => {
      state.isLoading = true;
    },

    [userRegister.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isLogged = false;
      state.isError = true;
      state.errorMsg = payload.message[0].messages[0].message;
    },

    [fetchUserToDoLists.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.todoLists = payload;
      state.filteredTodoLists = payload;
    },

    [fetchUserToDoLists.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchUserToDoLists.rejected]: (state) => {
      state.isLoading = false;
    },

    [removeUserToDoList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.todoLists = state.todoLists.filter(
        (todo) => todo.id !== payload.id
      );
      state.filteredTodoLists = state.filteredTodoLists.filter(
        (todo) => todo.id !== payload.id
      );
    },

    [removeUserToDoList.pending]: (state) => {
      state.isLoading = true;
    },

    [removeUserToDoList.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = userSlice;
export const {
  clearState,
  cleanWholeState,
  sortToDoListsBy,
  searchToDoList,
  setPreviouslyLoggedUser,
} = actions;
export default reducer;
