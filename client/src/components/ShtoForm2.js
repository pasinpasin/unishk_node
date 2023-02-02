import FormRow from "./FormRow";
import React, { useState } from "react";

const ShtoForm2 = (props) => {
  return (
    <form className="form" onSubmit={props.eventi}>
      <FormRow
        type="text"
        name={props.emri}
        value={props.formvlera}
        handleChange={props.handleChange}
        handleBlur={props.handleBlur}
      />

      <button type="submit" className="btn btn-block " disabled={props.loading}>
        {props.loading ? "loading..." : "Ruaj"}
      </button>
    </form>
  );
};

export default ShtoForm2;
