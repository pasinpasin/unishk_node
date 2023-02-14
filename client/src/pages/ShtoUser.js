
import { useAppContext } from "../context/appContext";
import FormRow from "../components/FormRow";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttpClient from "../hooks/useHttpClient";
import React from "react";
import FormrowSelect from "../components/FormrowSelect";
import Loading from "../components/Loading";
import FormCheckBox from "../components/FormCheckBox";
import Alert from "../components/Alert2";
import { useNavigate } from 'react-router-dom';

const ShtoUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  const navigate = useNavigate();
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbimri] = useState("");
  const [atesia, setAtesia] = useState("");
  const [titulli, setTitulli] = useState("");
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [passwordconfirm, SetpasswordConfirm] = useState("");
  const [fakulteti, setFakulteti] = useState(""); //permban me vone id e fakultetit
  const [departamenti, setDepartamenti] = useState("");

  const [fakultetet, setFakultetet] = useState([]);
  const [departamentet, setDepartamentet] = useState([]);
  const [userloading, setUserloading] = useState(true);
  const [checked, setChecked] = useState([]);
  const titujt=["MSc", "Dr.", "Prof.Dr", "Doc", "Prof.Asoc. Dr"];

  const postData = async (newuser) => {
    try {
      const { data } = await sendRequest(`users/`, "POST", newuser);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getFakultetet = async () => {
    try {
      const { data } = await sendRequest(`/fakulteti`, "GET", {});

      setFakultetet(...fakultetet, data.fakultetet);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartamentet = async () => {
    try {
      const { data } = await sendRequest(`/departamenti`, "GET", {});

      setDepartamentet(...departamentet, data.departamentet);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newuser={email,password,passwordconfirm,emri,mbiemri,titulli,atesia,fakulteti,departamenti}
    postData(newuser);
    navigate('/users');
  
  };

  useEffect(() => {
    if (userloading) {
      
      getFakultetet();
      getDepartamentet();
      setUserloading(false);
    } 
  }, []);

  const handleCheck = (event) => {
    
    var updatedList = [...checked];
    console.log(updatedList);
    if (event.target.checked) {
     // console.log(checked.includes(user.role));
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
   
    setChecked(updatedList);
  };


  const setFilter=(departamentet)=>{
   return  departamentet.filter(
      (departament) => departament.fakulteti._id === fakulteti
    )
    
  }

 

  return (
    <>
      {userloading ? (
        <Loading center />
      ) : (
        <>
          { error.alertType !== "" ?? (
            <Alert alertType={error.alertType} alertText={error.alertText} />
          )}
           <Alert alertType={error.alertType} alertText={error.alertText} />
          <form className="form" onSubmit={onSubmit}>
         { isLoading && 
        <Loading center />}
            <FormRow
              type="email"
              name="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />

            <FormRow
              type="password"
              name="password"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <FormRow
              type="password"
              name="passwordconfirm"
              value={passwordconfirm}
              handleChange={(e) => SetpasswordConfirm(e.target.value)}
            />
            <FormRow
              type="text"
              name="emri"
              value={emri}
              handleChange={(e) => setEmri(e.target.value)}
            />
            <FormRow
              type="text"
              name="mbiemri"
              value={mbiemri}
              handleChange={(e) => setMbimri(e.target.value)}
            />
            <FormRow
              type="text"
              name="atesia"
              value={atesia}
              handleChange={(e) => setAtesia(e.target.value)}
            />
            <FormrowSelect
             
              name="titulli"
              value={titulli}
              lista={titujt}
              handleChange={(e) => setTitulli(e.target.value)}
            />

            <FormrowSelect

            name="fakulteti"
            value={fakulteti}

            handleChange={(e) => setFakulteti(e.target.value)}
            className="form-select"

            lista={fakultetet}
            ></FormrowSelect>



            <FormrowSelect
              name="departamenti"
              value={departamenti}
              handleChange={(e) => {setDepartamenti(e.target.value) }}
              /* lista={departamentet} */
              lista={setFilter(departamentet)} 
            />
            <FormCheckBox
              name="roles"
              handleChange={handleCheck}
              arr={checked}
            />

            <button type="submit" className="btn btn-block ">
              Ruaj
            </button>
          </form>{" "}
        </>
      )}
    </>
  );
};

export default ShtoUser;
