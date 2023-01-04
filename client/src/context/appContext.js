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
} from "./Actions";

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  //user: user ? JSON.parse(user) : null,
  user: "",
  token: null,
  userLocation: "",
  showSidebar:true,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    const currentuser2=JSON.stringify(currentUser) ;
    dispatch({ type: LOGIN_USER_BEGIN });
    await delay(5000);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      
        
    },
    
   
  };
 
  
  
    try {
      const { data } = await axios.post("/api/v1/users/signin", currentUser);
      
      const { user, token, location } = data;
   
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
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
    dispatch({type:TOGGLE_SIDEBAR})
  }

  const logoutUser= () => {
    dispatch({type:LOGOUT_USER})
  }
  return (
    <AppContext.Provider value={{ ...state, displayAlert, loginUser,toggleSidebar,logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
