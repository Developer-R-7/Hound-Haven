import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Notify from "./Modals/Notify";
import PetContext from "../Context/PetContext";
import { Modal } from "react-bootstrap";
import HandleAppoint from "./Helpers/HandleAppoint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "./paw_logo.PNG";

const NavBar = () => {
	const { userData, setUserData } = useContext(UserContext);
	const [links, setLinks] = useState(null);
	const { appt, setAppt } = useContext(PetContext);
	const { pets } = useContext(PetContext);
	const [show, setShow] = useState(false);
	const [vals, setVals] = useState([]);
	const [about, showAbout] = useState(false);

	const logout = () => {
		setUserData({ token: undefined, user: undefined });
		localStorage.setItem("auth-token", "");
	};

	const linkStyle = {
		textDecoration: "none",
		color: "black",
	};

	const handleClose = () => {
		setShow(false);
	};

	const closeAbout = () => {
		showAbout(false);
	};

	const openAbout = () => {
		showAbout(true);
	};

	useEffect(async () => {
		if (!userData.user) {
			setLinks(
				<ul className="navbar-nav ms-auto">
					<li className="nav-item">
						<Link className="nav-link" to="/login" style={linkStyle}>
							Login
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/register" style={linkStyle}>
							Register
						</Link>
					</li>
				</ul>
			);
		} else {
			setLinks(
				<ul className="navbar-nav ms-auto">
					{appt > 0 && (
						<li className="nav-item ">
							<Link
								to=".."
								onClick={(e) => {
									e.preventDefault();
									setShow(true);
								}}
							>
								<span className="animate__animated animate__swing animate__repeat-3 fa fa-bell fa-sm">
									<i className="badge">{appt}</i>
								</span>
							</Link>
						</li>
					)}
					<li className="nav-item ">
						<Link
							className="nav-link"
							to="/"
							style={linkStyle}
							onClick={logout}
						>
							Log Out
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/home" style={linkStyle}>
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link
							to=".."
							className="nav-link"
							style={linkStyle}
							onClick={openAbout}
						>
							About
						</Link>
					</li>
				</ul>
			);
			setAppt(HandleAppoint(pets, "nav"));

			appt && setVals(HandleAppoint(pets, "notify"));
		}
	}, [userData, appt, pets]);

	return (
		<>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<h3 className="navbar-brand">MyPet</h3>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<FontAwesomeIcon icon={faBars} style={{ color: "#747d8c" }} />
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						{links}
						<Modal name="test" show={show} onHide={handleClose}>
							<Modal.Body>
								<Notify vals={vals} />
							</Modal.Body>
						</Modal>

						<Modal name="about" show={about} onHide={closeAbout}>
							<Modal.Body>
								<div className="card text-center  border-0">
									<h5 className="card-title">The My Pet App</h5>
									<div className="card-body">
										<img
											src={logo}
											alt="petLogo"
											className="p-3 img-fluid rounded-circle w-10"
										></img>

										<p className="card-text">
											Love your pet and want to make sure they are well taken
											care of? It can be difficult to keep up with regular pet
											exams, yearly vaccinations, and medications. After all, we
											have a hard enough time keeping up with our own health let
											alone that of our furry, feathery, or scaly friends.
											That's where My Pet comes in! A user friendly app that
											keeps track of your pets and all their medical needs for a
											healthier life.
										</p>
									</div>
								</div>
							</Modal.Body>
						</Modal>
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavBar;
