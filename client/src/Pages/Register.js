import React, { useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import { useHistory } from "react-router-dom";
import RegisterForm from "../Components/RegisterForm.js";
import About from "../Components/About.js";

const Register = () => {
	const { userData} = useContext(UserContext);
	const history = useHistory();
	useEffect(() => {
		if (userData.user) history.push("/");
	}, [userData.user, history]);

	return (
		<div>
			<div className="container-fluid">
				<div className="row align-items-center ">
				<About />	
				<RegisterForm />			
				</div>
			</div>
		</div>
	);
};

export default Register;
