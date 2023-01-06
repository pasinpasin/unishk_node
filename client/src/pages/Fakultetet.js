import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import Wrapper from "../assets/wrappers/JobsContainer";

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
  } = useAppContext();

  useEffect(() => {
    ListoFakultetet();

    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }

 /*  if (fakultetet.length === 0) {
    return <h2>No jobs to display...</h2>;
  } */
  return (
    <Wrapper>
      {showAlert && <Alert />}

      <table>
        <tbody>
          {fakultetet.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.emertimi}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Fakultetet;
