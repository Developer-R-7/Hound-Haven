import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../Context/UserContext"

const NavBar = () => {
	const { userData, setUserData } = useContext(UserContext);
	const [ links, setLinks ] = useState(null)
  
	const logout = () => {
	  setUserData({ token: undefined, user: undefined });
	  localStorage.setItem("auth-token", "");
	};
  
	  useEffect(() => {
		  if (!userData.user) {
			setLinks(
			  <Fragment>
				<li><Link to="/login" >Login</Link></li>
				<li><Link to="/register" >Register</Link></li>
			  </Fragment>
			)     
		  }else{
			setLinks(
			  <Fragment>
				<li className="nav-item active"><Link to="/notify" >
				</Link></li>	
				<li className="nav-item active"><Link to="/" onClick={logout} >Logout</Link></li>
			  </Fragment>
			)
		  }       
	  }, [userData])



	return (
	<nav className="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
            <h2>My Pet</h2>
            <ul className="navbar-nav mr-auto">
              {links}
            </ul>      
	</nav>
	)
};

export default NavBar;
