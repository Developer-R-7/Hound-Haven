import React, { useState } from "react";

const AddVisit = (props) => {
    const petId = props.petId;
	const [form, setForm] = useState({});

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};


	return (		  
	<div className="col-md-6">
		<form name='addVisitForm'>
			<div className="form-group">
				<label>Visit Date</label>
				<input
					onChange={onChange}
					type="date"
					name="VisitDate"
					className="form-control"
					placeholder="Date of Visit"
				/>
			</div>
			<div className="form-group">
				<label>Doseage</label>
				<input
					onChange={onChange}
					type="text"
					name="VisitNotes"
					className="form-control"
					placeholder="Enter Notes from the Visit"
				/>
			</div>
			
		</form>
	</div>
	)
};

export default AddVisit;
