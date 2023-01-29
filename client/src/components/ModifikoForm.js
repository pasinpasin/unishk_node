import { useState, useEffect } from "react";
import FormRow from "./FormRow";

const ModifikoForm = (props) => {
  
  return (
    <form className="form" onSubmit={props.eventi}>
      <FormRow
        type="text"
        name="fakulteti"
        value={props.formvlera}
        handleChange={props.handleChange}
      />

      <button type="submit" className="btn btn-block " disabled={props.loading}>
        {props.loading ? "loading..." : "Modifiko"}
      </button>
      <button 
        onClick={() => props.setEditing(false)}
        className="btn btn-block"
      >
       Anullo
      </button>
    </form>
  );
};

export default ModifikoForm;
