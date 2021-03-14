import React from "react";

const AddPet = () => {
	return (
		<div className="modal" id="addAPetModal" tabIndex="-1">
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div
						style={{ display: "inline-flex", justifyContent: "center" }}
						className="modal-body"
					>
						<form>
							<div className="form-group">
								<label>Photo/avatar</label>
								<br />

								<div
									style={{
										height: "60px",
										width: "60px",
										border: "2px dashed black",
										borderRadius: "100%",
									}}
								>
									<img
										style={{
											position: "absolute",
										}}
									/>
								</div>
								<input type="file" accept="image/*" multiple="false" />
							</div>
							<p></p>
							<div className="form-group">
								<input placeholder="Pet name" name="PetName" type="text" />
							</div>
							<div className="form-group">
								<label>Birth Date</label>
								<br />
								<input placeholder="Birth Date" name="BirthDate" type="date" />
							</div>
							<div className="form-group">
								<input
									id="test"
									placeholder="Gender"
									name="Gender"
									type="text"
								/>
							</div>
							<div className="form-group">
								<input placeholder="Type" name="TypeOfPet" type="text" />
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary">
							Save Pet
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddPet;
