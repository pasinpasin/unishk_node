import { useState, useEffect } from "react";
import FormRow from "./FormRow";

const ModifikoForm = (props) => {
  const [user, setUser] = useState(props.currentFakultet);
  return (
    <form className="form" onSubmit={props.placeSubmitHandler}>
      <FormRow
        type="text"
        name="fakulteti"
        value={props.formvlera}
        handleChange={props.handleChange}
      />

      <button type="submit" className="btn btn-block " disabled={props.loading}>
        {props.loading ? "loading..." : "Modifiko"}
      </button>
    </form>
  );
};

export default ModifikoForm;
