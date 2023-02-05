import React, { useReducer, useCallback, useEffect } from "react";
import { validate } from "../utils/validator";



const FormRow2 = (props) => {

  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
      </label>
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={props.changeHandler}
        onBlur={props.touchHandler}
        className="form-input"
        data-validators={props.validators}
      />
    </div>
  );
};

export default FormRow2;
