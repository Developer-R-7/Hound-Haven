import React, { useState, useEffect } from "react";
import Moment from "moment";

const AddReminder = (props) => {
  const petId = props.petId;
  const [reminderId] = useState(props.data._id);

  const [form, setForm] = useState({
    Date: Moment(props.data.Date).format("YYYY-MM-DD"),
    Title: props.data.Title,
    Note: props.data.Note,
  });

  const [date, setReminderDate] = useState("");
  const [note, setReminderNotes] = useState("");
  const [title, setReminder] = useState("");

  useEffect(() => {
    if (reminderId !== 0) {
      setReminderDate(props.data.Date);
      setReminderNotes(props.data.Note);
      setReminder(props.data.Title);
    }
  }, [reminderId]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log("submit", form);
  };

  return (
    <div className="col-md-6">
      <form name="addReminderForm" onSubmit={submit}>
        <input
          type="hidden"
          id="reminderId"
          name="reminderId"
          value={reminderId}
        />
        <div className="form-group">
          <label>Date</label>
          <input
            onChange={onChange}
            type="date"
            name="Date"
            className="form-control"
            placeholder="Date reminder needed"
            defaultValue={Moment(date).format("YYYY-MM-DD")}
            value={form.Date}
          />

          <label>Title</label>
          <input
            onChange={onChange}
            type="text"
            name="Title"
            className="form-control"
            placeholder="title"
            defaultValue={title}
            value={form.Title}
          />

          <label>Note</label>
          <input
            onChange={onChange}
            type="text"
            name="Note"
            className="form-control"
            placeholder="note"
            defaultValue={note}
            value={form.Note}
          />
        </div>
      </form>
    </div>
  );
};

export default AddReminder;
