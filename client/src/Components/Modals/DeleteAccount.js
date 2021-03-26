import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";
import axios from "axios";

const DeleteAccount = () => {
	//Bring in userdate from context
	const { userData, setUserData } = useContext(UserContext);

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
		<div id="Delete" className="modal fade">
			<div className="modal-dialog modal-confirm">
				<div className="modal-content">
					<div className="modal-header flex-column">
						<div className="icon-box">
							<i className="fa fa-times-circle"></i>
						</div>
						<h4 className="modal-title w-100">Are you sure?!</h4>
					</div>
					<div className="modal-body">
						<p>
							Do you really want to delete your account? This process cannot be
							undone.
						</p>
					</div>
					<div className="modal-footer justify-content-center">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
						>
							Cancel
							
						</button>
						<button
							onClick={handleDelete}
							type="button"
							className="btn btn-danger"
							data-bs-dismiss="modal"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteAccount;
