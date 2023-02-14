const FormCheckBox = (props) => {
  const checkList = [
    "admin",
    "pedagog",
    "shefdepartamenti",
    "dekan",
    "kurrikula",
  ];

  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
      </label>

      {checkList.map((itemValue, index) => {
        return (
          <div key={index}>
            <input
              value={itemValue}
              type="checkbox"
              key={index}
              id={index}
              onChange={props.handleChange}
              checked={ props.arr.includes(itemValue)}
            />
            {itemValue}
          </div>
        );
      })}
    </div>
  );
};

export default FormCheckBox;
