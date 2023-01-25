import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import Wrapper from "../assets/wrappers/Tabela";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import FormRow from "../components/FormRow";
import axios from "axios";
import Tabela from "../components/Tabela";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const Fakultetet2 = () => {
  //const [values, setValues] = useState(initialState);
  //const navigate = useNavigate();

  const {
    user,
    token,
    isLoading,
    showAlert,
    displayAlert,
    loginUser,
    ListoFakultetet,
    fakultetet,
    sendRequest,
  } = useAppContext();

  const columnsData = [
    { field: "emertimi", header: "Fakulteti" },
    { field: "veprimet", header: "Veprimet" },
  ];
  const [columns, setColumns] = useState(columnsData);

  //console.log({ columns });
  const [fakultetet2, setFakultetet2] = useState("");
  const shtoFakultet = (fakultet) => {
    setFakultetet2([...fakultetet2, fakultet]);
  };

  useEffect(() => {
    console.log("u thirr")
    sendRequest("/fakulteti", "GET", {}, "GET_FAKULTETE");
    //ListoFakultetet();

    //shtoFakultet(fakultetet);

    // eslint-disable-next-line
  }, []);
 // let [fak] = fakultetet.data;
  console.log(fakultetet.length);

  if (isLoading) {
    return <Loading center />;
  }

  /*  if (fakultetet.length === 0) {
    return <h2>No jobs to display...</h2>;
  } */

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <div>
        <h2>Fakultetet</h2>
       { fakultetet.length > 0 ? <Tabela kol={columns} data2={fakultetet} />: "S ka fakultete"}
      </div>
    </Wrapper>
  );
};

export default Fakultetet2;
