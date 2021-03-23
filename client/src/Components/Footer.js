import React from "react";
import DeleteAccount from "./Modals/DeleteAccount";

const Footer = () => {
	const style = {
		backgroundColor: "#BACBA9",
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
					<button data-bs-toggle="modal" data-bs-target="#Delete" className="delete-user-btn">
						delete account
					</button>
				</div>
			</div>
			<DeleteAccount />
		</div>
	);
};

export default Footer;
