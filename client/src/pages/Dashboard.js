import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/SharedLayout";
import { Navbar, BigSidebar, SmallSidebar } from "../components";

const Dashboard = () => {
  const fetchData = async () => {
    try {
      const response = await fetch("/");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
 /*  useEffect(() => {
    fetchData();
  }, []); */

  return (
    
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default Dashboard;
