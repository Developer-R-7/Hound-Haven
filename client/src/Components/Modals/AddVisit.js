import React, { useEffect, useState } from "react";
import Moment from "moment";

const AddVisit = (props) => {
	const [visitId] = useState(props.data._id);

	const [form, setForm] = useState({
		VisitDate: Moment.utc(props.data.VisitDate).format("YYYY-MM-DD"),
		VisitNotes: props.data.VisitNotes,
	});

	console.log(form);
	const [visitDate, setVisitDate] = useState("");
	const [visitNotes, setVisitNotes] = useState("");

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (visitId !== 0) {
			setVisitDate(props.data.VisitDate);
			setVisitNotes(props.data.VisitNotes);
		}
	}, [visitId, props.data.VisitDate, props.data.VisitNotes]);

	const submit = async (e) => {
		e.preventDefault();
	};

	return (
		<div className="col-md-6">
			<form name="addVisitForm" onSubmit={submit}>
				<input type="hidden" id="visitId" name="visitId" value={visitId} />
				<div className="form-group">
					<label>Visit Date</label>
					<input
						onChange={onChange}
						type="date"
						name="VisitDate"
						className="form-control"
						placeholder="Date of Visit"
						defaultValue={Moment.utc(visitDate).format("YYYY-MM-DD")}
						value={form.VisitDate}
					/>
				</div>
				<div className="form-group">
					<label>Notes</label>
					<input
						onChange={onChange}
						type="text"
						name="VisitNotes"
						className="form-control"
						placeholder="Enter Notes from the Visit"
						defaultValue={visitNotes}
						value={form.VisitNotes}
					/>
				</div>
			</form>
		</div>
	);
};

export default AddVisit;
