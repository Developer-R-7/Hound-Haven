import React, { Fragment, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Notify from "./Modals/Notify";
import PetContext from "../Context/PetContext";
import logo from "./paw_logo.PNG";
import { Modal } from "react-bootstrap";
import Card from "./Card";

const NavBar = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [links, setLinks] = useState(null);
  const { appt, setAppt } = useContext(PetContext);
  const [show, setShow] = useState(false);

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
  };
  const showModal = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
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
          <button>About</button>
          <img
            src={logo}
            alt="petLogo"
            style={{ height: "65px", width: "65px" }}
            onClick={showModal}
          ></img>
        </div>
      </nav>
      <Notify />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About My Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
