import React, { useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import { useHistory } from "react-router-dom";
import LoginForm from "../Components/LoginForm.js";
import About from "../Components/About.js";

const Login = () => {
	const { userData } = useContext(UserContext);
	const history = useHistory();
	useEffect(() => {
		if (userData.user) history.push("/");
	}, [userData.user, history]);

	return (
		<div className="container-fluid">
			<div className="row align-items-center ">
				<About />
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
