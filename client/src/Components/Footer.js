import React, { useContext } from "react";
import DeleteAccount from "./Modals/DeleteAccount";
import UserContext from "../Context/UserContext";

const Footer = () => {
	const { userData } = useContext(UserContext);
	const style = {
		backgroundColor: "#ffffff",
		opacity: "0.5",
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

	return (
		<div>
			<div style={invisible}>
				<div style={style}>
					<span>From pet parents to you</span>
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
			</div>
			<DeleteAccount />
		</div>
	);
};

export default Footer;
