import React, { useState } from "react";

const AddVital = (props) => {
	const petId = props.petId;
	const [form, setForm] = useState({});

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return(
			<div className="col-md-6">
			<form name='addVitalsForm'>
			<div className="form-group">
					<label>Date</label>
					<input
						onChange={onChange}
						type="date"
						name="WeightDate"
						className="form-control"
						placeholder="Date Weight Taken"
					/>
				<div className="form-group">
					<label>Weight</label>
					<input
						onChange={onChange}
						type="text"
						name="VitalWeight"
						className="form-control"
						placeholder="Enter Weight in lbs"
					/>
				</div>
				</div>
				
			</form>
		</div>
	)
};

export default AddVital;
