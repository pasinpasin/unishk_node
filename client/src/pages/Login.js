import { useState, useEffect } from "react";
import React, { Component } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert.js";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";

const initialState = {
  email: "",
  password: "",
  isMember: true,
};
const Login = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const { user, isLoading, showAlert, displayAlert, loginUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, isMember } = values;
    if (!email || !password) {
      //console.log("je ketu");
      displayAlert();
      return;
    }
    const currentUser = { email, password };

    loginUser(currentUser);
  };

  useEffect(() => {
    if (user) {
      /*  setTimeout(() => {
        navigate("/");
      }, 2000); */
      navigate("/");
    }
  }, [user, navigate]);

  return (
    user ?? (
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          {<Logo />}
          <h3>{"Login"}</h3>
          {showAlert && <Alert />}

          {/* email input */}
          <FormRow
            type="email"
            name="email"
            value={values.email}
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
          <p>{values.isMember ? "Not a member yet?" : "Already a member?"}</p>
        </form>
      </Wrapper>
    )
  );
};

export default Login;
