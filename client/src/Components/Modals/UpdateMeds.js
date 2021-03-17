import React, { useEffect, useState } from "react";
import Moment from "react-moment"

const UpdateMeds = (props) => {
  const petId = props.petId;

  const onChange = (e) => {
    props.setUpdate({ ...props.medToUpdate, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(props.medToUpdate);
  }, []);

  return (
    <div className="col-md-6">
      <form name="updateMedForm">
        <div className="form-group">
          <label>Medication Name</label>
          <input
            onChange={onChange}
            name="medication"
            type="text"
            className="form-control"
            placeholder={props.medToUpdate.MedicationName}
          />
        </div>

        <div className="form-group">
          <label>{<Moment format="MM/DD/YYYY">{props.medToUpdate.DueDate}</Moment>}</label>
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
            placeholder={props.medToUpdate.Dose}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateMeds;
