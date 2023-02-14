import { useAppContext } from "../context/appContext";
import useHttpClient from "../hooks/useHttpClient";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert2";
import Wrapper from "../assets/wrappers/Tabela";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Tabela from "../components/Tabela2";

function GetPropertyValue(obj1, dataToRetrieve) {
  return dataToRetrieve.split(".").reduce(function (o, k) {
    return o && o[k]; // get inner property if `o` is defined else get `o` and return
  }, obj1); // set initial value as object
}
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
    if (window.confirm("Jeni te sigurte?")) {
      try {
        const data = await sendRequest(`/users/${id}`, "DELETE", {});
      } catch (error) {
        console.log(error);
      }
      getData();
    }
  };

  const getData = async () => {
    try {
      const { data } = await sendRequest(`users`, "GET", {});
      console.log(data.users);
      setUsers2(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let url = "/";

  return (
    <Wrapper>
      {isLoading ? (
        <Loading center />
      ) : (
        <div>
          {error.alertType !== "" ?? (
            <Alert alertType={error.alertType} alertText={error.alertText} />
          )}
          {users2 && users2.length > 0 ? (
            <>
            <Link to={`/users/shtouser`} >
              <button className="btn  ">
                Shto user
                
              </button></Link>
              <table>
                <thead>
                  <tr key="kolonat">
                    {columnsData.map((column) => (
                      <th key={column.field}> {column.header}</th>
                    ))}

                    <th key="veprimet">Veprimet</th>
                  </tr>
                </thead>
                <tbody>
                  {users2.map((data) => (
                    <tr key={data._id}>
                      {columnsData.map((data3) => (
                        <td key={data3.header} data-label={data3.header}>
                          {GetPropertyValue(data, data3.field)}
                        </td>
                      ))}

                      {
                        <td key="veprimet" data-label="Veprimet">
                          <Link to={`/users/${data._id}/edit`}>
                            <FaEdit size={25} />
                          </Link>
                          <MdDelete
                            size={25}
                            onClick={() => fshijUser(data._id)}
                          />
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            "S ka user"
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Users;
