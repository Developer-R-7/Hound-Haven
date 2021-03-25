import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterForm = () => {
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

      if (
        !form.displayName ||
        !form.email ||
        !form.password ||
        !form.passwordCheck
      ) {
        return toast.error("Please enter all fields.");
      }

      if (form.passwordCheck !== form.password) {
        return toast.error("Password does not match the check.");
      }

      if (form.password.length < 8) {
        return toast.error("Password must contain at least 8 characters.");
      }

      // 	  displayName: "shellsea"
      // email: "elainesbarrera@gmail.com"
      // password: "123198"
      // passwordCheck: "123198"

      const newUser = await axios.post("/users/register", form);
      toast.success(
        "Check your email and follow the link to verify your account!"
      );
      history.push("/login");
    } catch (err) {
      toast.error(err.response);
    }
  };

  useEffect(() => {
    if (userData.user) history.push("/");
  }, [userData.user, history]);

  return (
    <div className="col-md-6">
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={onChange}
            name="email"
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={onChange}
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label>Password Check</label>
          <input
            onChange={onChange}
            type="password"
            name="passwordCheck"
            className="form-control"
            placeholder="Verify Password"
          />
        </div>
        <div className="form-group">
          <label>Preferred Name</label>
          <input
            onChange={onChange}
            type="text"
            name="displayName"
            className="form-control"
            placeholder="Preferred Name"
          />
        </div>
        <button type="submit">Register</button>
        <button style={{ margin: 20 }} onClick={() => history.push("/login")}>
          Login
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
