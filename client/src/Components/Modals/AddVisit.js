import React, { useEffect, useState } from "react";
import Moment from "moment";

const AddVisit = (props) => {
  const petId = props.petId;
  const [visitId] = useState(props.data._id);
  // console.log(props.data)

  const [form, setForm] = useState({
    VisitDate: Moment(props.data.VisitDate).format("YYYY-MM-DD"),
    VisitNotes: props.data.VisitNotes,
  });

  console.log(form);
  const [visitDate, setVisitDate] = useState("");
  const [visitNotes, setVisitNotes] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log('yp', form)
  };

  useEffect(() => {
    if (visitId !== 0) {
      setVisitDate(props.data.VisitDate);
      setVisitNotes(props.data.VisitNotes);
    }
  }, [visitId]);

  const submit = async (e) => {
    e.preventDefault();
    // console.log("submit",form);
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
            defaultValue={Moment(visitDate).format("YYYY-MM-DD")}
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
