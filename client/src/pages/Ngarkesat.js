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
import Tabela from "../components/Tabela2";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";

const Ngarkesat = (props) => {
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
    ListoUsers,
    // users,
    sendRequest,
  } = useAppContext();

  const idf = useParams();
  console.log(idf);

  const columnsData = [
    { field: "emri", header: "Emri" },
    { field: "mbiemri", header: "Mbiemri" },
    { field: "titulli", header: "Titulli" },
    { field: "fakulteti.emertimi", header: "Fakulteti" },
    { field: "departamenti.emertimi", header: "Departamenti" },
  ];
  const [columns, setColumns] = useState(columnsData);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users2, setUsers2] = useState();
  const [formusers, setformusers] = useState("");
  const initialFormState = { id: null, users: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const editRow = (userpermodifikim) => {
    setformusers("");
    setCurrentUser({
      id: userpermodifikim._id,
      users: userpermodifikim.emertimi,
    });
    //setformusers(userpermodifikim.emertimi);
    setEditing(true);
  };
  //console.log(currentUser);

  const shtoUser = (user) => {
    setUsers2([...users2, user]);
  };

  const getData = async () => {
    try {
      const { data } = await sendRequest(
        `departamenti/${idf.id}/users`,
        "GET",
        {},
        "GET_PEDAGOG"
      );
      console.log(data.users);
      if (data.users.length > 0) setUsers2(data.users);
      setLoading(false);
      console.log(data.users);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const shtoData = async () => {
    try {
      const bodytosend = {
        emertimi: `${formusers}`,
        fakulteti: `${props.fid}`,
        departamenti: `${idf.id}`,
      };
      console.log(bodytosend);
      //const { data } = await sendRequest(
      const data = await sendRequest(
        "/users",
        "POST",
        bodytosend,
        "SHTO_PEDAGOG"
      );
      setformusers("");
      if (data.status === "success") {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ModifikoData = async () => {
    try {
      const bodytosend = { emertimi: `${currentUser.users}` };

      const data = await sendRequest(
        `/users/${currentUser.id}`,
        "PATCH",
        bodytosend,
        "PERDITESO_PEDAGOG"
      );
    } catch (error) {
      console.log(error);
    }
    setEditing(false);
    getData();
  };

  const fshijUser = async (id) => {
    try {
      const data = await sendRequest(
        `/users/${id}`,
        "DELETE",
        {},
        "FSHIJ_PEDAGOG"
      );
    } catch (error) {
      console.log(error);
    }
    getData();
  };

  useEffect(() => {
    console.log("u thirr users");

    getData();
  }, []);

  const handleChange = (e) => {
    setformusers(e.target.value);
  };

  const handleChange2 = (e) => {
    console.log(e);
    setCurrentUser({
      id: currentUser.id,
      users: e.target.value,
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
  let url = "/users/id/";

  return (
    <Wrapper>
      {loading ? (
        <Loading center />
      ) : (
        <div>
          {editing ? (
            <>
              <h2>Edit user</h2>
              {showAlert && <Alert />}
              <ModifikoForm
                eventi={placeSubmitHandler2}
                setEditing={setEditing}
                emri="Useri"
                //editrow={editRow}
                formvlera={currentUser.users}
                handleChange={handleChange2}
              />
            </>
          ) : (
            <>
              <h2>Shto Users</h2>
              {showAlert && <Alert />}
              <ShtoForm
                eventi={placeSubmitHandler}
                formvlera={formusers}
                loading={loading}
                emri="Useri"
                handleChange={handleChange}
              />
            </>
          )}

          {users2 && users2.length > 0 ? (
            <Tabela
              kol={columns}
              data2={users2}
              fshij={fshijUser}
              modifiko={editRow}
              url={url}
            />
          ) : (
            "S ka usere"
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Ngarkesat;
