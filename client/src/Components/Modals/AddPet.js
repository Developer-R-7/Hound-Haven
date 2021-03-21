import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import PetContext from "../../Context/PetContext";
import UserContext from "../../Context/UserContext";
//import Resize from "react-image-file-resizer";

import { toast } from "react-toastify";
//import {resizeFile} from '../Helpers/PetFunctions';

const AddPet = () => {
	const { userData } = useContext(UserContext);
	const [user] = useState(userData.user?.id);
	const [file, setFile] = useState(null);
	const uploadedImage = useRef(null);
	const imageUploader = useRef(null);
	//state for new pet data to be added to db
	const [newPet, setnewPet] = useState(null);
	const [PetImageLoc, setPetImgLoc] = useState(null);
	const {setNewPetData } = useContext(PetContext);

	//handle change of form data to be set for newPet state
	const handleChange = (e) => {
		setnewPet({ ...newPet, [e.target.name]: e.target.value });
	};

	//handel save button to add a new pet to db
	const saveNewPet = async (e) => {
		e.preventDefault();
		newPet.PetImageLoc = PetImageLoc;
		console.log(newPet);

		try {
			const pet = await axios.post("/api/pet", newPet, {
				headers: { "x-auth-token": localStorage.getItem("auth-token") },
			});
		    console.log(pet);
			setNewPetData(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleImage = async (e) => {
		e.preventDefault();
		try {
			let file = e.target.files[0]
			file && setFile(file);

				var formData = new FormData()
			
				formData.append('file', file)
			
				console.log(formData);

				const data = await axios
					.post("/api/saveImage", formData, {
						headers: { "x-auth-token": localStorage.getItem("auth-token") },
					})	
				console.log(data.data.imageurl);	
				setPetImgLoc(data.data.imageurl)
			
		} catch (error) {
		
			toast.error("There was a problem compressing the file, please try again" + error);
			
		}
	};

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
										border: "1px dashed black",
										borderRadius: "100%",
									}}
									onClick={() => imageUploader.current.click()}
								>
									<img
										ref={uploadedImage}
										style={{
											height: "60px",
											width: "60px",
											border: "none",
											borderRadius: "100%",
										}}
										alt="uploaded picture of pet " 
									/>
								</div>
								<input
									onChange={(e) => handleImage(e)}
									ref={imageUploader}
									type="file"
									accept="image/*"
									multiple={false}
									name="PetImageLoc"
									style={{
										display: "none",
									}}
								/>
							</div>

							<p></p>
							<div className="form-group">
								<input
									onChange={handleChange}
									placeholder="Pet name"
									name="PetName"
									type="text"
								/>
							</div>
							<div className="form-group">
								<label>Birth Date</label>
								<br />
								<input
									onChange={handleChange}
									placeholder="Birth Date"
									name="BirthDate"
									type="date"
								/>
							</div>
							<div className="form-group">
								<input
									onChange={handleChange}
									placeholder="Gender"
									name="Gender"
									type="text"
								/>
							</div>
							<div className="form-group">
								<input
									onChange={handleChange}
									placeholder="Type"
									name="TypeOfPet"
									type="text"
								/>
							</div>
							<div className="form-group">
								<input
									onChange={handleChange}
									placeholder="Breed"
									name="Breed"
									type="text"
								/>
							</div>
						</form>
					</div>
					<div
						onClick={saveNewPet}
						className="modal-footer"
						data-bs-dismiss="modal"
					>
						<button type="submit" className="btn btn-primary">
							Save Pet
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddPet;
