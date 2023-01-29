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
  FSHIJ_FAKULTET_BEGIN,
  FSHIJ_FAKULTET_SUCCESS,
  FSHIJ_FAKULTET_ERROR,
  PERDITESO_FAKULTET_BEGIN,
  PERDITESO_FAKULTET_SUCCESS,
  PERDITESO_FAKULTET_ERROR,
  GET_DEPARTAMENTE_BEGIN,
  GET_DEPARTAMENTE_SUCCESS,
  GET_DEPARTAMENTE_ERROR,

  SHTO_DEPARTAMENT_BEGIN,
  SHTO_DEPARTAMENT_SUCCESS,
  SHTO_DEPARTAMENT_ERROR,
  FSHIJ_DEPARTAMENT_BEGIN,
  FSHIJ_DEPARTAMENT_SUCCESS,
  FSHIJ_DEPARTAMENT_ERROR,
  PERDITESO_DEPARTAMENT_BEGIN,
  PERDITESO_DEPARTAMENT_SUCCESS,
  PERDITESO_DEPARTAMENT_ERROR,
} from "./Actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  // console.log(action.type);
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

  if (action.type === GET_FAKULTETE_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_FAKULTETE_SUCCESS) {
    console.log(action.payload.data.data.fakultetet);
    return {
      ...state,
      isLoading: false,
      fakultetet: action.payload.data.data.fakultetet,
      //fakultetet: action.payload,
      // fakultetet: action.payload.responseData.data,
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
      showAlert: true,
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

  if (action.type === FSHIJ_FAKULTET_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === FSHIJ_FAKULTET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Fakulteti u fshi",
    };
  }
  if (action.type === FSHIJ_FAKULTET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === PERDITESO_FAKULTET_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === PERDITESO_FAKULTET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Fakulteti u perditesua",
    };
  }
  if (action.type === PERDITESO_FAKULTET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }







  if (action.type === GET_DEPARTAMENTE_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_DEPARTAMENTE_SUCCESS) {
    console.log(action.payload.data.data.deparamentet);
    return {
      ...state,
      isLoading: false,
      deparamentet: action.payload.data.data.deparamentet,
      //fakultetet: action.payload,
      // fakultetet: action.payload.responseData.data,
    };
  }
  if (action.type === GET_DEPARTAMENTE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      deparamentet: [],
    };
  }

  if (action.type === SHTO_DEPARTAMENT_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === SHTO_DEPARTAMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Departamenti i shtua",
    };
  }
  if (action.type === SHTO_DEPARTAMENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === FSHIJ_DEPARTAMENT_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === FSHIJ_DEPARTAMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Departamenti u fshi",
    };
  }
  if (action.type === FSHIJ_DEPARTAMENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === PERDITESO_DEPARTAMENT_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === PERDITESO_DEPARTAMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Departamenti u perditesua",
    };
  }
  if (action.type === PERDITESO_DEPARTAMENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
