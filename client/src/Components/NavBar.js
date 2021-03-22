import React, { Fragment, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Notify from "./Modals/Notify";
import PetContext from "../Context/PetContext";
import logo from "./paw_logo.PNG";

const NavBar = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [links, setLinks] = useState(null);
  const { appt, setAppt } = useContext(PetContext);

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
    margin: "25px",
  };

  console.log("nav", appt);

  useEffect(() => {
    if (!userData.user) {
      setLinks(
        <ul className="navbar-nav" style={{ justifyContent: "space-between" }}>
          <li className="nav-item">
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </li>
          {/* <li>
            <img src={logo} alt="petLogo"></img>
          </li> */}
        </ul>
      );
    } else {
      setLinks(
        <ul className="navbar-nav">
          {appt > 0 && (
            <li className="nav-item">
              <Link data-bs-toggle="modal" data-bs-target="#notifyModal">
                <i className="bi bi-bell">{{ appt }}</i>
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/" style={linkStyle} onClick={logout}>
              Logout
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/home" style={linkStyle}>
              Home
            </Link>
          </li>
        </ul>
      );
    }
  }, [userData]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#FFE2E2", height: "60px" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            MyPet
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            {links}
          </div>
        </div>
      </nav>
      <Notify />
    </>
  );
};

export default NavBar;
