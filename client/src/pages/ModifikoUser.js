import ModifikoForm from "../components/ModifikoForm";
import { useAppContext } from "../context/appContext";
import FormRow from "../components/FormRow";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttpClient from "../hooks/useHttpClient";
import React from "react";
import FormrowSelect from "../components/FormrowSelect";
import Loading from "../components/Loading";

const ModifikoUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { id } = useParams();

  const [emri, setEmri] = useState("");
  const [mbiemri, setMbimri] = useState("");
  const [atesia, setAtesia] = useState("");
  const [titulli, setTitulli] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [fakulteti, setFakulteti] = useState("");
  const [departamenti, setDepartamenti] = useState("");
  const [user, setUser] = useState(null);
  const [fakultetet, setFakultetet] = useState([]);
  const [departamentet, setDepartamentet] = useState();
  const [userloading, setUserloading] = useState(true);

  const getData = async () => {
    try {
      const { data } = await sendRequest(`users/${id}`, "GET", {});
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getFakultetet = async () => {
    try {
      const { data } = await sendRequest(`/fakulteti`, "GET", {});
      console.log(data.fakultetet);
      setFakultetet(...fakultetet, data.fakultetet);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartamentet = async () => {
    try {
      const { data } = await sendRequest(`/departamenti`, "GET", {});

      setDepartamentet(data.departamentet);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    return;
  };

  useEffect(() => {
    if (!user || user._id !== id) {
      getData();
      getFakultetet();
      getDepartamentet();
      setUserloading(false);
      console.log(fakultetet);
    } else {
      setEmri(user.emri);
      setMbimri(user.mbiemri);
      setEmail(user.email);
      setPassword(user.password);
      setConfirmpassword(user.password);
      setTitulli(user.titulli);
    }
  }, [user]);

  return (
    <>
      {userloading ? (
        <Loading center />
      ) : (
        <form className="form" onSubmit={onSubmit}>
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
            name="confirmpassword"
            value={confirmpassword}
            handleChange={(e) => setConfirmpassword(e.target.value)}
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
          <FormRow
            type="text"
            name="titulli"
            value={titulli}
            handleChange={(e) => setTitulli(e.target.value)}
          />
          <FormRow
            type="text"
            name="role"
            value={role}
            handleChange={(e) => setRole(e.target.value)}
          />
          <FormrowSelect
            name="fakulteti"
            value={fakulteti}
            handleChange={(e) => setTitulli(e.target.value)}
            lista={fakultetet}
          ></FormrowSelect>

          <button type="submit" className="btn btn-block ">
            Ruaj
          </button>
        </form>
      )}
    </>
  );
};

export default ModifikoUser;
