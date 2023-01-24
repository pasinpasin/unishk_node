import { useNavigate } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import React from "react";
import { useAppContext } from "../context/appContext";
import axios from "axios";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";

const ShtoFakultet = () => {
  const { user, sendRequest, isLoading, showAlert, displayAlert } =
    useAppContext();

  const navigate = useNavigate();
  

  const [fakulteti, setfakulteti] = useState("");
  //const [loading, setloading] = useState(false);

  //const isMounted = useRef(true);

  if (isLoading) {
    return <Loading center />;
  }

  const handleChange = (e) => {
    setfakulteti(e.target.value);
  };

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    //const  fakulteti  = formFakultet;
    const fak = "/fakulteti";
    const meth = "POST";
    const ti = "SHTO_FAKULTET";
    //console.log(fakulteti);
    const bodytosend= {emertimi:`${fakulteti}`}
    console.log(bodytosend);

    sendRequest(fak, meth,bodytosend, ti);
    navigate('/');
  };

  return (
    <React.Fragment>
      <Wrapper className="full-page">
        <form className="form" onSubmit={placeSubmitHandler}>
          {<Logo />}
          <h3>{"Shto fakultet"}</h3>
          {showAlert && <Alert />}

          {/* email input */}
          <FormRow
            type="text"
            name="fakulteti"
            value={fakulteti}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-block " disabled={isLoading}>
            {isLoading ? "loading..." : "Ruaj"}
          </button>
        </form>
      </Wrapper>
    </React.Fragment>
  );
};

export default ShtoFakultet;
