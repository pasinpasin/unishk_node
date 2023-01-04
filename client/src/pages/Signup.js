import { useState, useEffect } from "react";
import React, { Component } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert.js"
import FormRow from "../components/FormRow"
import Logo from "../components/Logo"


const initialState = {
  email: "",
  password: "",
  emri:"",
  mbiemri:"",
  titulli:"",
  atesia:"",
  confirmpassword:"",
  fakulteti:"",
  departamenti:"",
  isMember: true,
};
const Signup = () => {
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
      console.log("je ketu")
      displayAlert();
      return;
    }
    const currentUser = { email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      console.log("duhet te logoheni");
    }
    console.log(e);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    }
  }, [user, navigate]);
  
  return (
	<Wrapper className='full-page'>
	<form className='form' onSubmit={onSubmit}>
	 {  <Logo /> }
	 <h3>{'Login'}</h3>
	  {showAlert && <Alert />}
	 

	  {/* email input */}
	  <FormRow
		type='email'
		name='email'
		value={values.email}
		handleChange={handleChange}
	  />
	  {/* password input */}
	  <FormRow
		type='password'
		name='password'
		value={values.password}
		handleChange={handleChange}
	  />
      <FormRow
		type='password'
		name='confirmpassword'
		value={values.confirmpassword}
		handleChange={handleChange}
	  />
       <FormRow
		type='text'
		name='emri'
		value={values.emri}
		handleChange={handleChange}
	  />
        <FormRow
		type='text'
		name='mbiemri'
		value={values.mbiemri}
		handleChange={handleChange}
	  />
       <FormRow
		type='text'
		name='atesia'
		value={values.atesia}
		handleChange={handleChange}
	  />
        <FormRow
		type='text'
		name='titulli'
		value={values.titulli}
		handleChange={handleChange}
	  />
	     <button
          type='submit'
          className='btn btn-block '
          disabled={isLoading}
          
        >
          {isLoading ? 'loading...' : 'Login'}
        </button>
	  <p>
		{values.isMember ? 'Not a member yet?' : 'Already a member?'}
		
	  </p>
	</form>
  </Wrapper>
    
  );
};

export default Signup;
