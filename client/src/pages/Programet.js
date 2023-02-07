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

const Programet = (props) => {
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
    ListoProgramet,
    // programet,
    sendRequest,
  } = useAppContext();

  const idf = useParams();

  const columnsData = [
    { field: "emertimi", header: "Programi" },
    { field: "veprimet", header: "Veprimet" },
  ];
  const [columns, setColumns] = useState(columnsData);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [programet2, setProgramet2] = useState();
  const [formprogrami, setformprogrami] = useState("");
  const initialFormState = { id: null, programi: "" };
  const [currentProgram, setCurrentProgram] = useState(initialFormState);

  const editRow = (programpermodifikim) => {
    setformprogrami("");
    setCurrentProgram({
      id: programpermodifikim._id,
      programi: programpermodifikim.emertimi,
    });
    //setformprogrami(programpermodifikim.emertimi);
    setEditing(true);
  };
  //console.log(currentProgram);

  const shtoProgram = (program) => {
    setProgramet2([...programet2, program]);
  };

  const getData = async () => {
    try {
      const { data } = await sendRequest(
        `departamenti/${idf.id}/programi`,
        "GET",
        {},
        "GET_PROGRAME"
      );
      if (data.programet.length > 0) setProgramet2(data.programet);
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
        emertimi: `${formprogrami}`,
        fakulteti: `${props.fid}`,
        departamenti: `${idf.id}`,
      };
      console.log(bodytosend);
      //const { data } = await sendRequest(
      const data = await sendRequest(
        "/programi",
        "POST",
        bodytosend,
        "SHTO_PROGRAM"
      );
      setformprogrami("");
      if (data.status === "success") {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ModifikoData = async () => {
    try {
      const bodytosend = { emertimi: `${currentProgram.programi}` };

      const data = await sendRequest(
        `/programi/${currentProgram.id}`,
        "PATCH",
        bodytosend,
        "PERDITESO_PROGRAM"
      );
    } catch (error) {
      console.log(error);
    }
    setEditing(false);
    getData();
  };

  const fshijProgram = async (id) => {
    try {
      const data = await sendRequest(
        `/programi/${id}`,
        "DELETE",
        {},
        "FSHIJ_PROGRAM"
      );
    } catch (error) {
      console.log(error);
    }
    getData();
  };

  useEffect(() => {
    console.log("u thirr programet");

    getData();
  }, []);

  const handleChange = (e) => {
    setformprogrami(e.target.value);
  };

  const handleChange2 = (e) => {
    console.log(e);
    setCurrentProgram({
      id: currentProgram.id,
      programi: e.target.value,
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
  let url = "/departamenti/id/programi";

  return (
    <Wrapper>
      {loading ? (
        <Loading center />
      ) : (
        <div>
          {editing ? (
            <>
              <h2>Edit program</h2>
              {showAlert && <Alert />}
              <ModifikoForm
                eventi={placeSubmitHandler2}
                setEditing={setEditing}
                emri="Programi"
                //editrow={editRow}
                formvlera={currentProgram.programi}
                handleChange={handleChange2}
              />
            </>
          ) : (
            <>
              <h2>Shto Programet</h2>
              {showAlert && <Alert />}
              <ShtoForm
                eventi={placeSubmitHandler}
                formvlera={formprogrami}
                loading={loading}
                emri="Programi"
                handleChange={handleChange}
              />
            </>
          )}

          {programet2 && programet2.length > 0 ? (
            <Tabela
              kol={columns}
              data2={programet2}
              fshij={fshijProgram}
              modifiko={editRow}
              url={url}
            />
          ) : (
            "S ka programe"
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Programet;
