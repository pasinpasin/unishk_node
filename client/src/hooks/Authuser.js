import React from "react";
import { useAppContext } from "../context/appContext";
import { useState, useEffect } from "react";

function Authuser() {
  //const [authuser, setAuthuser] = useState(null);

  let { user, checkifLoggedin } = useAppContext();

  useEffect(() => {
    if (!user) {
      checkifLoggedin();
    }
  }, [user, checkifLoggedin]);

  console.log(user);

  return user;
}

export default Authuser;
