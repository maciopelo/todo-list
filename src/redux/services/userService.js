/* eslint-disable no-restricted-globals */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./config";

export const userLogin = createAsyncThunk(
  "user/login",

  async ({ identifier, password }, thunkAPI) => {
    try {
      const response = await axios.post("auth/local", { identifier, password });

      const data = response.data;

      const user = {
        token: data.jwt,
        email: data.user.email,
        login: data.user.username,
        isLogged: true,
      };

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(...data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",

  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await axios.post("auth/local/register", {
        username,
        email,
        password,
      });

      const data = response.data;

      const user = {
        token: data.jwt,
        email: data.user.email,
        login: data.user.username,
        isLogged: true,
      };

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        return { ...data };
      } else {
        console.log("Error", response.status);
        console.log("Error", response.data);
        return thunkAPI.rejectWithValue(...data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserToDoLists = createAsyncThunk(
  "user/todos",

  async ({ foundUserToken }, thunkAPI) => {
    try {
      const response = await axios.get("to-do-lists", {
        headers: {
          Authorization: "Bearer " + foundUserToken,
        },
      });

      const data = response.data;
      if (response.status === 200) {
        return data;
      } else {
        console.log("Error", response.status);
        console.log("Error", response.data);
        return thunkAPI.rejectWithValue(...data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const removeUserToDoList = createAsyncThunk(
  "user/deleteTodod",

  async (id, thunkAPI) => {
    const onYes = confirm("Do you want to delete this list?");
    if (onYes) {
      try {
        const loggedInUser = localStorage.getItem("user");
        const foundUserToken = JSON.parse(loggedInUser).token;
        const response = await axios.delete(`to-do-lists/${id}`, {
          headers: {
            Authorization: "Bearer " + foundUserToken,
          },
        });

        if (response.status === 200) {
          return response.data;
        }
      } catch (e) {
        console.log("Error " + e.response.data);
      }
    }
  }
);
