import React, { useReducer, useContext, useEffect, useState } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  GET_FAKULTETE_SUCCESS,
  GET_FAKULTETE_BEGIN,
  GET_FAKULTETE_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./Actions";

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  //user: user ? JSON.parse(user) : null,
  user: null,
  token: null,
  userLocation: "",
  showSidebar: true,
  fakultetet: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response.data.message);
      if (error.response.status === 401) {
        logoutUser();
      }
      let errormsg = error.response.data.message;
      if (errormsg.includes("Your token has expired")) {
        logoutUser();
      }

      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 30000);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    await delay(2000);
    try {
      const { data } = await axios.post("/api/v1/users/signin", currentUser);

      const { user, token } = data.data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      //addUserToLocalStorage({user,token,location})
    } catch (error) {
      console.log();
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
  };

  const ListoFakultetet = async () => {
    console.log(axios.defaults.headers);
    dispatch({ type: GET_FAKULTETE_BEGIN });
    try {
      const { user } = state.user;

      // const { data } = await authFetch.get("/api/v1/fakulteti", user, {
      const { data } = await authFetch.get("/fakulteti", user, {
        // headers: "Cache-Control: no-cache, no-store",
      });
      const fakultetet = data.data.fakultetet;
      console.log(fakultetet);

      console.log({ data });
      dispatch({ type: GET_FAKULTETE_SUCCESS, payload: { fakultetet } });
    } catch (error) {
      dispatch({
        type: GET_FAKULTETE_ERROR,
        payload: { msg: error.response.data.message },
      });
      console.log(error.response.data.message);
    }
    clearAlert();
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await axios.get("/api/v1/auth/getCurrentUser");
      const { user } = data.data;
      console.log(user);

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        loginUser,
        toggleSidebar,
        logoutUser,
        ListoFakultetet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
