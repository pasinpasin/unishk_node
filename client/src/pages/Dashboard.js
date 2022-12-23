import { useEffect, useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import Navbar from "../components/UI/Navbar";
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        {/* Header */}

        <div className="px-4 md:px-10 mx-auto w-full -m-24">"menune"</div>
      </div>
    </>
  );
};
export default Dashboard;
