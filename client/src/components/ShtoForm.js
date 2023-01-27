import FormRow from "./FormRow";
import React, { useState } from "react";

const ShtoForm = (props) => {
  return (
    <form className="form" onSubmit={props.eventi}>
      <FormRow
        type="text"
        name="fakulteti"
        value={props.formvlera}
        handleChange={props.handleChange}
      />

      <button type="submit" className="btn btn-block " disabled={props.loading}>
        {props.loading ? "loading..." : "Ruaj"}
      </button>
    </form>
  );
};

export default ShtoForm;
