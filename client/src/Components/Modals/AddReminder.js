import React, { useState } from "react";

const AddReminder = (props) => {
	const petId = props.petId;
	const [form, setForm] = useState({});

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return(
			<div className="col-md-6">
			<form name='addReminderForm'>
			<div className="form-group">
					<label>Date</label>
					<input
						onChange={onChange}
						type="date"
						name="date"
						className="form-control"
						placeholder="Date reminder needed"
					/>
			
					<label>Title</label>
					<input
						onChange={onChange}
						type="text"
						name="title"
						className="form-control"
						placeholder="title"
					/>
				
							
				<label>Note</label>
					<input
						onChange={onChange}
						type="text"
						name="note"
						className="form-control"
						placeholder="note"
					/>
				</div>
		
				
			</form>
		</div>
	)
};

export default AddReminder;
