import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
	const { userData, setUserData } = useContext(UserContext);
	const history = useHistory();
	const [form, setForm] = useState({});
	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};


	const submit = async (e) => {
		e.preventDefault();
			  try {
				console.log(form);
				const newUser = await axios.post("/users/register", form);
				history.push('/login')
			  } catch (err) {
				toast.error(err.response);
			  }
		  //} 
	  };

	  useEffect(() => {
		if (userData.user) history.push("/");
	}, [userData.user, history]);
	
    return (

            <div className="col-md-6">
					<form onSubmit={submit}>
						<div className="form-group">
							<label>Email</label>
							<input onChange={onChange}  name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    						<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input onChange={onChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
						</div>
						<div className="form-group">
							<label>Password Check</label>
							<input onChange={onChange} type="password" name="passwordCheck" className="form-control" id="exampleInputPassword1" placeholder="Verify Password"/>
						</div>
						<div className="form-group">
							<label>Preferred Name</label>
							<input onChange={onChange} type="text" name="displayName" className="form-control" id="exampleInputPassword1" placeholder="Preferred Name"/>
						</div>
							<button  type="submit">Register</button>	
					
					</form>
				</div>
				
				

    )
}

export default LoginForm
