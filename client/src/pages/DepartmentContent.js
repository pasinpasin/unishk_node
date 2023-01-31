import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Wrapper from "../assets/wrappers/TabsWrapper";
import Alert from "../components/Alert";
import { Tabs, Tab, Content } from "../components/TabsComp";
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
import Programet from "./Programet";
import Pedagoget from "./Pedagoget";

const DepartamentContent = () => {
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

  useEffect(() => {
    console.log("u thirr bashke");

    getFakultet();
  }, []);

  const getFakultet = async () => {
    try {
      const { data } = await sendRequest(
        `departamenti/${idf.id}/`,
        "GET",
        {},
        "GET_FAKULTET_FROM_DEP"
      );
      //setProgramet2(data.programet);
      //setLoading(false);
      //console.log(data);
    } catch (error) {
      console.log(error);
      //setLoading(false);
    }
  };

  let url = "/departamenti/id/programi";

  const [activeTab, setActiveTab] = useState("tab1");
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to programet
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to pedagoget
    setActiveTab("tab2");
  };

  return (
    <Wrapper>
      <div className="Tabs">
        <ul className="nav">
          <li
            className={activeTab === "tab1" ? "active" : ""}
            onClick={handleTab1}
          >
            Programet
          </li>
          <li
            className={activeTab === "tab2" ? "active" : ""}
            onClick={handleTab2}
          >
            Pedagoget
          </li>
        </ul>

        <div className="outlet">
          {activeTab === "tab1" ? <Programet /> : <Pedagoget />}
        </div>
      </div>
    </Wrapper>
  );
};

export default DepartamentContent;
