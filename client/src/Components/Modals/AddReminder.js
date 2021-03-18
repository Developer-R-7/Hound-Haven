import React, { useState, useEffect } from "react";
import Moment from "moment";

const AddReminder = (props) => {
  const petId = props.petId;
  const [reminderId] = useState(props.data._id);
  const [form, setForm] = useState({
    ReminderDate: Moment(props.data.ReminderDate).format("YYYY-MM-DD"),
    ReminderNotes: props.data.ReminderNotes,
  });

  const [reminderDate, setReminderDate] = useState("");
  const [reminderNotes, setReminderNotes] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (reminderId !== 0) {
      setReminderDate(props.data.ReminderDate);
      setReminderNotes(props.data.ReminderNotes);
    }
  }, [reminderId]);

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
            name="date"
            className="form-control"
            placeholder="Date reminder needed"
            defaultValue={Moment(reminderDate).format("YYYY-MM-DD")}
            value={form.ReminderDate}
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
            name="Remindernotes"
            className="form-control"
            placeholder="note"
            defaultValue={reminderNotes}
            value={form.ReminderNotes}
          />
        </div>
      </form>
    </div>
  );
};

export default AddReminder;
