import React from "react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";

const PetDash = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/");
  }, [userData.user, history]);

  return (
    <div>
      <h1>PetDash</h1>
    </div>
  );
};

export default PetDash;
