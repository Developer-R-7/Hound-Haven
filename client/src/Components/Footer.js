import React, { useContext } from "react";
import DeleteAccount from "./Modals/DeleteAccount";
import UserContext from "../Context/UserContext";

const Footer = () => {
	const { userData } = useContext(UserContext);

	return (
		<footer className="bd-footer p-3 p-md-5 mt-5 bg-light text-center text-sm-start">
			<div className="container">
				<span className="footer-text">From pet parents to you</span>
				{userData.user ? (
					<button
						data-bs-toggle="modal"
						data-bs-target="#Delete"
						className="delete-user-btn"
					>
						delete account
					</button>
				) : null}
			</div>
			<DeleteAccount />
		</footer>
	);
};

export default Footer;
