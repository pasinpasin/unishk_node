import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  GET_FAKULTETE_BEGIN,
  GET_FAKULTETE_SUCCESS,
  GET_FAKULTETE_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  SHTO_FAKULTET_BEGIN,
  SHTO_FAKULTET_SUCCESS,
  SHTO_FAKULTET_ERROR,
} from "./Actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  console.log(action.type);
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Plotesoni te gjitha fushat",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return { ...state, showAlert: false, alertType: "", alertText: "" };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    console.log(action.payload.user);
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,

      showAlert: true,
      alertType: "success",
      alertText: "User successfully logged in! Redirecting...",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    //console.log(action.payload.msg);
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLoading: false,
    };
  }
  if (action.type === GET_FAKULTETE_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_FAKULTETE_SUCCESS) {
    console.log(action.payload);
    return {
      ...state,
      isLoading: false,
      // fakultetet: action.payload.fakultetet,
      fakultetet: action.payload,
    };
  }
  if (action.type === GET_FAKULTETE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      fakultetet: [],
    };
  }

  if (action.type === SHTO_FAKULTET_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === SHTO_FAKULTET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      alertType: "success",
      alertText: "Fakulteti i shtua",
    };
  }
  if (action.type === SHTO_FAKULTET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return { ...state, userLoading: true, showAlert: false };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
