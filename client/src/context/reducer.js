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
  GET_CURRENT_USER_ERROR,
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
  GET_PROGRAME_BEGIN,
  GET_PROGRAME_SUCCESS,
  GET_PROGRAME_ERROR,
  SHTO_PROGRAM_BEGIN,
  SHTO_PROGRAM_SUCCESS,
  SHTO_PROGRAM_ERROR,
  FSHIJ_PROGRAM_BEGIN,
  FSHIJ_PROGRAM_SUCCESS,
  FSHIJ_PROGRAM_ERROR,
  PERDITESO_PROGRAM_BEGIN,
  PERDITESO_PROGRAM_SUCCESS,
  PERDITESO_PROGRAM_ERROR,
  GET_PEDAGOG_BEGIN,
  GET_PEDAGOG_SUCCESS,
  GET_PEDAGOG_ERROR,
  VALIDO_INPUT,
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
      userfakultet: action.payload.userfakultet,
      userdepartament: action.payload.userdepartament,
      userrole: action.payload.userrole,

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
      userfakultet: action.payload.userfakultet,
      userdepartament: action.payload.userdepartament,
      userrole: action.payload.userrole,
    };
  }

  if (action.type === GET_CURRENT_USER_ERROR) {
    return {
      ...state,
      userLoading: false,
      user: null,
      userfakultet: null,
      userdepartament: null,
      userrole: null,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_FAKULTETE_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_FAKULTETE_SUCCESS) {
    //console.log(action.payload.data.data.fakultetet);
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
    return {
      ...state,
      isLoading: false,
      departamentet: action.payload.data.data.departamentet,
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

  if (action.type === GET_PROGRAME_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_PROGRAME_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      programet: action.payload.data.data.programi,
      //fakultetet: action.payload,
      // fakultetet: action.payload.responseData.data,
    };
  }
  if (action.type === GET_PROGRAME_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      programet: [],
    };
  }

  if (action.type === SHTO_PROGRAM_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === SHTO_PROGRAM_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "programi u shtua",
    };
  }
  if (action.type === SHTO_PROGRAM_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === FSHIJ_PROGRAM_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === FSHIJ_PROGRAM_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "programi u fshi",
    };
  }
  if (action.type === FSHIJ_PROGRAM_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === PERDITESO_PROGRAM_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === PERDITESO_PROGRAM_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "programi u perditesua",
    };
  }
  if (action.type === PERDITESO_PROGRAM_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_PEDAGOG_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_PEDAGOG_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      alertType: "success",
      alertText: "PEDAGOGU u perditesua",
    };
  }
  if (action.type === GET_PEDAGOG_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === VALIDO_INPUT) {
    let formIsValid = true;
    for (const inputId in state.inputs) {
      if (inputId === action.inputId) {
        formIsValid = formIsValid && action.isValid;
      } else {
        formIsValid = formIsValid && state.inputs[inputId].isValid;
      }
    }
    return {
      ...state,
      inputs: {
        ...state.inputs,
        [action.inputId]: { value: action.value, isValid: action.isValid },
      },
      isValidFormFinal: formIsValid,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
