import React from "react";

const Notify = () => {
	return (
		<div className="modal" id="notifyModal" tabindex="-1">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						{/* <h5 class="modal-title">Modal title</h5> */}
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<div>
							<ul className="nav nav-tabs" id="myTab" role="tablist">
								<li className="nav-item" role="presentation">
									<button
										className="nav-link active"
										id="home-tab"
										data-bs-toggle="tab"
										data-bs-target="#home"
										type="button"
										role="tab"
										aria-controls="home"
										aria-selected="true"
									>
										Pet 1
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link"
										id="profile-tab"
										data-bs-toggle="tab"
										data-bs-target="#profile"
										type="button"
										role="tab"
										aria-controls="profile"
										aria-selected="false"
									>
										Pet 2
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link"
										id="contact-tab"
										data-bs-toggle="tab"
										data-bs-target="#contact"
										type="button"
										role="tab"
										aria-controls="contact"
										aria-selected="false"
									>
										Pet 3
									</button>
								</li>
							</ul>
							<div className="tab-content" id="myTabContent">
								<div
									className="tab-pane fade show active"
									id="home"
									role="tabpanel"
									aria-labelledby="home-tab"
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Similique, fugiat.
								</div>
								<div
									className="tab-pane fade"
									id="profile"
									role="tabpanel"
									aria-labelledby="profile-tab"
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
									dolorem.
								</div>
								<div
									className="tab-pane fade"
									id="contact"
									role="tabpanel"
									aria-labelledby="contact-tab"
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Fugiat, explicabo.
								</div>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						{/* <button type="button" class="btn btn-primary">
							Save changes
						</button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notify;
