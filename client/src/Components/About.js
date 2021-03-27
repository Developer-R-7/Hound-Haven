import React from "react";
// import logo from "./paw_logo.PNG";

const About = () => {
	return (
		<div className="col-md-5 about-card m-4">
			<div className="card text-center w-75 border-0">
				<h5 className="card-title">The My Pet App</h5>
				<div className="card-body">
					<img
						src="../images/paw_logo.PNG"
						alt="petLogo"
						className="p-3 img-fluid rounded-circle w-10"
					></img>

					<p className="card-text">
						Love your pet and want to make sure they are well taken care of? It
						can be difficult to keep up with regular pet exams, yearly
						vaccinations, and medications. After all, we have a hard enough time
						keeping up with our own health let alone that of our furry,
						feathery, or scaly friends. That's where My Pet comes in! A user
						friendly app that keeps track of your pets and all their medical
						needs for a healthier life.
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
