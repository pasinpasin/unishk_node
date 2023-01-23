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

import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const Fakultetet = () => {
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
    SHTOFAKULTET_BEGIN,
  } = useAppContext();

  const [shtofakultetloading, setshtofakultetLoading] = useState(false);
  const [fakultet, setfakultet] = useState("");

  useEffect(() => {
    ListoFakultetet();

    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (shtofakultetloading) {
    return <Loading center />;
  }

  /*  if (fakultetet.length === 0) {
    return <h2>No jobs to display...</h2>;
  } */
  const onSubmit = (e) => {
    e.preventDefault();
    setshtofakultetLoading(true);
    const fakulteti = fakultet;
    if (!fakulteti) {
      setshtofakultetLoading(false);
      //displayAlert();
      return;
    }
    shtoFakultet(fakulteti);
  };
  const handleChange = (e) => {
    setfakultet({ ...fakultet, [e.target.name]: e.target.value });
  };

  const shtoFakultet = async (fak) => {
    //await delay(2000);
    try {
      const { data } = await axios.post("/api/v1/fakulteti", fak);
      setshtofakultetLoading(false);
      //addUserToLocalStorage({user,token,location})
    } catch (error) {
      setshtofakultetLoading(false);
      console.log();
    }
  };

  return (
    <Wrapper>
      {showAlert && <Alert />}

      <form className="form" onSubmit={onSubmit}>
        <FormRow
          type="text"
          name="fakulteti"
          value={fakultet}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block ">
          Shto fakultet
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Fakulteti</th>
            <th>Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {fakultetet.map((item) => {
            return (
              <tr key={item._id}>
                <td data-label="Fakulteti">
                  <NavLink
                    to="kot"
                    key={item._id}
                    /* onClick={toggleSidebar} */
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    end
                  >
                    {item.emertimi}
                  </NavLink>
                </td>
                <td data-label="Veprimet">
                  <div className="actions">
                    <Link
                      to="/modifiko"
                      alt="Modifiko"
                      /* onClick={ () => setEditJob(_id) }*/
                    >
                      <span className="icon">{<GrEdit />}</span>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Fakultetet;
