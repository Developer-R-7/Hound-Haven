import React, { useContext } from "react";
import DeleteAccount from "./Modals/DeleteAccount";
import UserContext from "../Context/UserContext";

const Footer = () => {
  const { userData } = useContext(UserContext);
  //   const style = {
  //     backgroundColor: "#ffffff",
  //     opacity: "0.5",
  //     borderTop: "1px solid #E7E7E7",
  //     textAlign: "center",

  //     // position: "fixed",
  //     left: "0",
  //     bottom: "0",
  //     height: "10%",
  //     width: "100%",
  //   };

  //   const invisible = {
  //     display: "block",
  //     height: "10rem",
  //     width: "100%",
  //   };

  return (
    <footer className="bd-footer p-3 p-md-5 mt-5 bg-light text-center text-sm-start">
      <div className="container">
        <span className="footer-text">From pet parents to you</span>
        {userData.user ? (
          <button
            data-bs-toggle="modal"
            data-bs-target="#Delete"
            className="delete-user-btn"
          >
            delete account
          </button>
        ) : null}
      </div>
      <DeleteAccount />
    </footer>
  );
};

export default Footer;
