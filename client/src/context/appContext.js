import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import reducer from "./reducer";
import axios from "axios";
import { validate } from "../utils/validator";

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
  GET_CURRENT_USER_ERROR,
  SHTO_FAKULTET_BEGIN,
  SHTO_FAKULTET_SUCCESS,
  SHTO_FAKULTET_ERROR,
  GET_PEDAGOG_BEGIN,
  GET_PEDAGOG_SUCCESS,
  GET_PEDAGOG_ERROR,
  VALIDO_INPUT,
  TOUCH_INPUT,
} from "./Actions";

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  //user: user ? JSON.parse(user) : null,
  user: null,
  userfakultet: null,
  userdepartament: null,
  userrole: null,

  showSidebar: true,
  fakultetet: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("app context");

  //axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  const authFetch = axios.create({
    baseURL: "/api/v1",
    //validateStatus: false,
  });
  const activeHttpRequests = useRef([]);

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //console.log(error.response.data.message);
      if (error.response.status === 401) {
        logoutUser();
      }
      let errormsg = error.response.data.message;
      if (errormsg.includes("expired")) {
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

  const loginUser = useCallback(async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    await delay(2000);
    try {
      const { data } = await axios.post("/api/v1/users/signin", currentUser);

      const { user } = data.data;
      const userfakultet = user.fakulteti;
      const userdepartament = user.departamenti;
      const userrole = user.role;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, userfakultet, userdepartament, userrole },
      });
      //addUserToLocalStorage({user,token,location})
    } catch (error) {
      if (error.response) {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: error.response.data.message },
        });
      } else {
        console.log(error);
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: "Gabim ne lidhjen me serverin" },
        });
      }
    }

    clearAlert();
  }, []);

  const sendRequest = useCallback(async (url, method, body = {}, tipi) => {
    // setIsLoading(true);
    // console.log(tipi);
    /* const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl); */
    dispatch({ type: `${tipi}_BEGIN` });

    try {
      const { data } = await authFetch({
        method: method,
        url: url,
        data: body,
      });
      console.log(data);
      //const responseData = response.data;

      // console.log(response.data.data )
      //const fakultetet = response.data.fakultetet;
      //console.log({ responseData });
      dispatch({
        type: `${tipi}_SUCCESS`,
        payload: { data },
        // payload: { fakultetet }
      });
      /* 
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        ); */
      clearAlert();
      return data;
    } catch (error) {
      if (error.response) {
        dispatch({
          type: `${tipi}_ERROR`,
          payload: { msg: error.response.data.message },
        });
      } else {
        console.log(error);
        dispatch({
          type: `${tipi}_ERROR`,
          payload: { msg: "gabim ne server" },
        });
      }
      clearAlert();
    }
  });

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    await axios.get("/api/v1/auth/getCurrentUser/logout");
    dispatch({ type: LOGOUT_USER });
  };

  const ListoFakultetet = async () => {
    //console.log(axios.defaults.headers);
    dispatch({ type: GET_FAKULTETE_BEGIN });
    try {
      const { user } = state.user;
      console.log(user);
      // const { data } = await authFetch.get("/api/v1/fakulteti", user, {
      const { data } = await authFetch.get("/fakulteti", {
        // headers: "Cache-Control: no-cache, no-store",
      });
      const fakultetet = data.data.fakultetet;
      //console.log(fakultetet);

      //console.log({ data });
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
      //const { data } = await authFetch("/auth/getCurrentUser");
      const { data } = await authFetch("/auth/getCurrentUser");
      console.log(data);

      const { user } = data.data;
      const userfakultet = user.fakulteti;
      const userdepartament = user.departamenti;
      const userrole = user.role;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, userfakultet, userdepartament, userrole },
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logoutUser();
      } else {
        console.log(error);
        dispatch({
          type: GET_CURRENT_USER_ERROR,
          payload: { msg: "gabim ne server" },
        });
      }
      clearAlert();
    }
  };

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: VALIDO_INPUT,
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

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
        sendRequest,
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
