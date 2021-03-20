import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";

const Footer = () => {
	const { userData, setUserData } = useContext(UserContext);
	const style = {
		backgroundColor: "#ffc2c2",
		borderTop: "1px solid #E7E7E7",
		textAlign: "center",
		padding: "20px",
		position: "fixed",
		left: "0",
		bottom: "0",
		height: "60px",
		width: "100%",
	};

	const invisible = {
		display: "block",
		padding: "20px",
		height: "60px",
		width: "100%",
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			await axios.delete(`/users/delete/${userData.user.id}`, {
				headers: { "x-auth-token": localStorage.getItem("auth-token") },
			});
			setUserData({ token: undefined, user: undefined });
			localStorage.setItem("auth-token", "");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div style={invisible}>
				<div style={style}>
					<span>From pet parents to you</span>
					<button onClick={handleDelete}>delete account</button>
				</div>
			</div>
		</div>
	);
};

export default Footer;
