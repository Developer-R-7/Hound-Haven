import React, { useState } from "react";


const AddMeds = (props) => {
    const petId = props.petId;
	const [form, setForm] = useState({});

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};


  return (
	  
	<div className="col-md-6">
	<form name='addMedForm'>
		<div className="form-group">
			<label>Medication Name</label>
			<input
				onChange={onChange}
				name="medication"
				type="text"
				className="form-control"
				placeholder="Enter Medication Name"
			/>
		</div>
		{/* /////// IF WE DECIDE TO CALCULATE DOSES NEED THIS 
		    <div className="form-group">
			<label>Number of Doses</label>
			<input
				onChange={onChange}
				type="number"
				name="numDoses"
				className="form-control"
				placeholder="Number of Doses"
      			min={1} 
				max={90}
			/>
		</div>
		<div className="form-group">
			<label>Frequency in Days</label>
			<input
				onChange={onChange}
				type="number"
				name="frequency"
				className="form-control"
				placeholder="Interval in days"
      			min={1}
				max={365}  
			/>
			<small id="emailHelp" className="form-text text-muted">
				Maximum is 365 days (1 year)
			</small>
		</div>
		 */}
		<div className="form-group">
			<label>Start Date</label>
			<input
				onChange={onChange}
				type="date"
				name="startDate"
				className="form-control"
				placeholder="Start Date"
			/>
		</div>
		<div className="form-group">
			<label>Doseage</label>
			<input
				onChange={onChange}
				type="text"
				name="dose"
				className="form-control"
				placeholder="Ener Dosage"
			/>
		</div>
		
	</form>
</div>

  );
};

export default AddMeds;