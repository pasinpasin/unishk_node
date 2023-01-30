import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import Wrapper from "../assets/wrappers/Tabela";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ShtoForm from "../components/ShtoForm";
import ModifikoForm from "../components/ModifikoForm";
import axios from "axios";
import Tabela from "../components/Tabela";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";

const Departamentet = () => {
  //const [values, setValues] = useState(initialState);
  //const navigate = useNavigate();

  const {
    user,
    token,
    isLoading,
    showAlert,
    displayAlert,
    alertType,
    alertText,
    loginUser,
    ListoDepartamentet,
    // departamentet,
    sendRequest,
  } = useAppContext();

  const idf = useParams();

  const columnsData = [
    { field: "emertimi", header: "Departamenti" },
    { field: "veprimet", header: "Veprimet" },
  ];
  const [columns, setColumns] = useState(columnsData);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [departamentet2, setDepartamentet2] = useState();
  const [formdepartamenti, setformdepartamenti] = useState("");
  const initialFormState = { id: null, departamenti: "" };
  const [currentDepartament, setCurrentDepartament] =
    useState(initialFormState);

  const editRow = (departamentpermodifikim) => {
    setformdepartamenti("");
    setCurrentDepartament({
      id: departamentpermodifikim._id,
      departamenti: departamentpermodifikim.emertimi,
    });
    //setformdepartamenti(departamentpermodifikim.emertimi);
    setEditing(true);
  };
  //console.log(currentDepartament);

  const shtoDepartament = (departament) => {
    setDepartamentet2([...departamentet2, departament]);
  };

  const getData = async () => {
    try {
      const { data } = await sendRequest(
        `fakulteti/${idf.id}/departamenti`,
        "GET",
        {},
        "GET_DEPARTAMENTE"
      );
      setDepartamentet2(data.departamentet);
      setLoading(false);
      //console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const shtoData = async () => {
    try {
      const bodytosend = {
        emertimi: `${formdepartamenti}`,
        fakulteti: `${idf.id}`,
      };
      console.log(bodytosend);
      //const { data } = await sendRequest(
      const data = await sendRequest(
        "/departamenti",
        "POST",
        bodytosend,
        "SHTO_DEPARTAMENT"
      );
      setformdepartamenti("");
      if (data.status === "success") {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ModifikoData = async () => {
    try {
      const bodytosend = { emertimi: `${currentDepartament.departamenti}` };

      const data = await sendRequest(
        `/departamenti/${currentDepartament.id}`,
        "PATCH",
        bodytosend,
        "PERDITESO_DEPARTAMENT"
      );
    } catch (error) {
      console.log(error);
    }
    setEditing(false);
    getData();
  };

  const fshijDepartament = async (id) => {
    try {
      const data = await sendRequest(
        `/departamenti/${id}`,
        "DELETE",
        {},
        "FSHIJ_DEPARTAMENT"
      );
    } catch (error) {
      console.log(error);
    }
    getData();
  };

  useEffect(() => {
    console.log("u thirr");

    getData();
  }, []);

  const handleChange = (e) => {
    setformdepartamenti(e.target.value);
  };

  const handleChange2 = (e) => {
    console.log(e);
    setCurrentDepartament({
      id: currentDepartament.id,
      departamenti: e.target.value,
    });
  };

  const placeSubmitHandler = (event) => {
    event.preventDefault();

    shtoData();
  };

  const placeSubmitHandler2 = (event) => {
    event.preventDefault();

    ModifikoData();
  };
  let url = "/api/v1/departamenti/id/programi";

  return (
    
    <Wrapper>
      {loading ? (
        <Loading center />
      ) : (
        <div>
          {editing ? (
            <>
              <h2>Edit departament</h2>
              {showAlert && <Alert />}
              <ModifikoForm
                eventi={placeSubmitHandler2}
                setEditing={setEditing}
                emri="Departamenti"
                //editrow={editRow}
                formvlera={currentDepartament.departamenti}
                handleChange={handleChange2}
              />
            </>
          ) : (
            <>
              <h2>Shto Departamentet</h2>
              {showAlert && <Alert />}
              <ShtoForm
                eventi={placeSubmitHandler}
                formvlera={formdepartamenti}
                loading={loading}
                emri="Departamenti"
                handleChange={handleChange}
              />
            </>
          )}

          {departamentet2 && departamentet2.length > 0 ? (
            <Tabela
              kol={columns}
              data2={departamentet2}
              fshij={fshijDepartament}
              modifiko={editRow}
              url={url}
            />
          ) : (
            "S ka departamente"
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Departamentet;
