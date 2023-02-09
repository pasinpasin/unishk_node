const Alert = (props) => {
  return (
    <div className={`alert alert-${props.alertType}`}>{props.alertText}</div>
  );
};

export default Alert;
