import React, { Fragment, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";

const NavBar = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [links, setLinks] = useState(null);

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
    margin: "25px",
  };

  useEffect(() => {
    if (!userData.user) {
      setLinks(
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </li>
        </ul>
        // <Fragment>
        //   <li>
        //     <Link to="/login">Login</Link>
        //   </li>
        //   <li>
        //     <Link to="/register">Register</Link>
        //   </li>
        // </Fragment>
      );
    } else {
      setLinks(
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link to="/notify"></Link>
          </li>
          <li class="nav-item">
            <Link to="/" style={linkStyle} onClick={logout}>
              Logout
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/home" style={linkStyle}>
              Home
            </Link>
          </li>
        </ul>
      );

      // <Fragment>
      //   <li className="nav-item active">
      //     <Link to="/notify"></Link>
      //   </li>
      //   <li className="nav-item active">
      //     <Link to="/" onClick={logout}>
      //       Logout
      //     </Link>
      //   </li>
      //   <li className="nav-item active">
      //     <Link to="/home">Home</Link>
      //   </li>
      // </Fragment>
    }
  }, [userData]);

  return (
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#FFE2E2", height: "60px" }}
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          MyPet
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          {links}
        </div>
      </div>
    </nav>
    // <div>
    // 	<nav className="navbar navbar-light">
    // 			<a>My Pet</a>
    // 			<ul className="navbar-nav mr-auto">
    // 			{links}
    // 			</ul>
    // 	</nav>
    // </div>
  );
};

export default NavBar;
