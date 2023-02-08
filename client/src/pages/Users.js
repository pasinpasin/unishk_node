import { useAppContext } from "../context/appContext";
import useHttpClient from "../hooks/useHttpClient";
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

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { user } = useAppContext();

  const columnsData = [
    { field: "emri", header: "Emri" },
    { field: "mbiemri", header: "Mbiemri" },
    { field: "atesia", header: "Atesia" },
    { field: "email", header: "Email" },
    { field: "titulli", header: "Titulli" },
    { field: "role", header: "Roli" },
    { field: "fakulteti.emertimi", header: "Fakulteti" },
    { field: "departamenti.emertimi", header: "Departamenti" },
  ];

  const [users2, setUsers2] = useState();
  const ModifikoData = async () => {
    try {
      const bodytosend = {};

      const data = await sendRequest(
        "/users",
        "PATCH",
        bodytosend,
        "PERDITESO_PEDAGOG"
      );
    } catch (error) {
      console.log(error);
    }

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

  const getData = async () => {
    try {
      const data = await sendRequest(`users`, "GET", {}, "GET_USERS");
      console.log(data.data.users);
      setUsers2(data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [sendRequest]);

  let url = "/";

  return (
    <Wrapper>
      {isLoading ? (
        <Loading center />
      ) : (
        <div>
          {users2 && users2.length > 0 ? (
            <Tabela
              kol={columnsData}
              data2={users2}
              fshij={fshijUser}
              modifiko={ModifikoData}
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

export default Users;
