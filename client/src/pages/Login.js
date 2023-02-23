import { useState, useEffect } from "react";
import React, { Component } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert.js";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const initialState = {
  email: "",
  password: "",
  isMember: true,
  username: "",
};
const Login = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const { user, isLoading, userLoading, showAlert, displayAlert, loginUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = values;
    if (!username || !password) {
      //console.log("je ketu");
      displayAlert();
      return;
    }
    const currentUser = { username, password };

    loginUser(currentUser);
  };
  if (userLoading) return <Loading center />;

  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          {<Logo />}
          <h3>{"Login"}</h3>
          {showAlert && <Alert />}

          {/* email input */}
          <FormRow
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
          />
          {/* password input */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block " disabled={isLoading}>
            {isLoading ? "loading..." : "Login"}
          </button>
          <p>
            {values.isMember
              ? "Keni harruar fjalekalimin"
              : "Already a member?"}
          </p>
        </form>
      </Wrapper>
    </>
  );
};

export default Login;
