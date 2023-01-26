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
    // fakultetet,
    sendRequest,
  } = useAppContext();

  const columnsData = [
    { field: "emertimi", header: "Fakulteti" },
    { field: "veprimet", header: "Veprimet" },
  ];
  const [columns, setColumns] = useState(columnsData);

  const [loading, setLoading] = useState(true);

  //console.log({ columns });
  const [fakultetet2, setFakultetet2] = useState();
  const shtoFakultet = (fakultet) => {
    setFakultetet2([...fakultetet2, fakultet]);
  };

  const [formfakulteti, setformfakulteti] = useState("");

  const getData = async () => {
    try {
      const { data } = await sendRequest(
        "/fakulteti",
        "GET",
        {},
        "GET_FAKULTETE"
      );
      setFakultetet2(data.fakultetet);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const shtoData = async () => {
    try {
      const bodytosend = { emertimi: `${formfakulteti}` };
      const { data } = await sendRequest(
        "/fakulteti",
        "POST",
        bodytosend,
        "SHTO_FAKULTET"
      );
      console.log(data.status);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("u thirr");

    getData();
  }, []);

  const handleChange = (e) => {
    setformfakulteti(e.target.value);
  };
  const placeSubmitHandler = (event) => {
    event.preventDefault();

    shtoData();
  };

  return (
    <Wrapper>
      {showAlert && <Alert />}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h2>Fakultetet</h2>
          <div>
            <form className="form" onSubmit={placeSubmitHandler}>
              <FormRow
                type="text"
                name="fakulteti"
                value={formfakulteti}
                handleChange={handleChange}
              />

              <button
                type="submit"
                className="btn btn-block "
                disabled={loading}
              >
                {loading ? "loading..." : "Ruaj"}
              </button>
            </form>
          </div>
          {fakultetet2 && fakultetet2.length > 0 ? (
            <Tabela kol={columns} data2={fakultetet2} />
          ) : (
            "S ka fakultete"
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Fakultetet2;
