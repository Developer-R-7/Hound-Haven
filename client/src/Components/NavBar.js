import React, { Fragment, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Notify from "./Modals/Notify";
import PetContext from "../Context/PetContext";
import logo from "./paw_logo.PNG";
import { Modal } from "react-bootstrap";
import Card from "./Card";
import HandleAppoint from "./Helpers/HandleAppoint";
import moment from "moment";

const NavBar = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [links, setLinks] = useState(null);
  const { appt, setAppt } = useContext(PetContext);
  const { pets } = useContext(PetContext);
  const [show, setShow] = useState(false);
  const [vals, setVals] = useState([]);
  const [filteredPet, setFilteredPet] = useState(pets);

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
  };
  const showModal = () => {
    setShow(true);
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
    // margin: "25px",
  };

  const handleClose = () => {
    setShow(false);
  };

<<<<<<< HEAD
	useEffect(async () => {
		if (!userData.user) {
			setLinks(
				<ul className="navbar-nav">
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
							<Link
								onClick={(e) => {
									e.preventDefault();
									setShow(true);
								}}
							>
								<i className="bi bi-bell"></i>
								<span class="badge">{appt}</span>
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
			setAppt(HandleAppoint(pets, "nav"));
			console.log("nav", appt);
			appt && setVals(HandleAppoint(pets, "notify"));
		}
	}, [userData, appt, pets]);
=======
  useEffect(async () => {
    if (!userData.user) {
      setLinks(
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login" style={linkStyle}>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register" style={linkStyle}>
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
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  setShow(true);
                }}
              >
                <i className="bi bi-bell"></i>
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/"
              style={linkStyle}
              onClick={logout}
            >
              Logout
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home" style={linkStyle}>
              Home
            </Link>
          </li>
        </ul>
      );
      setAppt(HandleAppoint(pets, "nav"));
      console.log("nav", appt);
      appt && setVals(HandleAppoint(pets, "notify"));
    }
  }, [userData, appt, pets]);
>>>>>>> a10264d1e910da644aa9123e98c33f537cdfbb8f

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            MyPet
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {links}
            <Modal name="test" show={show} onHide={handleClose}>
              <Modal.Body>
                <Notify vals={vals} />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
