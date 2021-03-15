import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";
import { Button, Modal } from "react-bootstrap";





const AddMeds = (props) => {
    const petId = props.petId;
	const history = useHistory();
	const [form, setForm] = useState({});
	const [isOpen, setIsOpen] = useState(true);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);



	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const submit = async (e) => {
		e.preventDefault();
		try {
			console.log(form);
			//const newUser = await axios.post(`/api/updatepet/${petId}`, form);
			//history.push("/login");
		} catch (err) {
			toast.error(err.response);
		}
		//}
	};

	function toggleModal() {
		history.goBack();
	  }


  return (
	  
	<div className="col-md-6">
	<form onSubmit={submit} name='addMedForm'>
		<div className="form-group">
			<label>Medication Namel</label>
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


