function FormRow2({
  type,
  name,
  value,
  handleChange,
  labelText,
  handleBlur,
  validators,
  error,
}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-input"
        validators={validators}
        errortext={error}
      />
    </div>
  );
}

export default FormRow2;
