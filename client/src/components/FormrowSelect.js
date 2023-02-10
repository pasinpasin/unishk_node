const FormrowSelect = (props) => {
  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
      </label>
      <select
        name={props.name}
        value={props.value.emertimi}
        onChange={props.handleChange}
        className="form-select"
      >
        {props.lista.map((itemValue) => {
          return (
            <option key={itemValue._id} value={itemValue.emertimi}>
              {itemValue.emertimi}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormrowSelect;
