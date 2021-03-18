import React from "react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import AddReminder from "./Modals/AddReminder";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { getPetData } from "./Helpers/PetFunctions";

const Reminders = (props) => {
  console.log(props);
  let newData = props;
  const petId = props.petId;
  const [existing, setExisting] = useState(false);
  const [reminders, setReminders] = useState(props.reminders);
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    modalData && setShow(true);
  }, [modalData]);

  const handleClose = () => {
    setShow(false);
    getPetData(petId).then((data) => setReminders(data.reminders));
  };

  //   useEffect(() => {
  //     setReminders(newData.reminders);
  //   }, [newData]);

  const handleShow = () => setShow(true);

  reminders.sort(function (a, b) {
    var nameA = a.ReminderDate,
      nameB = b.ReminderDate;
    if (nameA < nameB)
      //sort string ascending
      return 1;
    if (nameA > nameB) return -1;
    return 0; //default return value (no sorting)
  });

  const handleAddUpdateVisit = async (e, form, cb) => {
    e.preventDefault();
    console.log("from click", form.addVisitForm);
    let url;
    let reminderId = form.addVisitForm.visitId.value;
    const vals = {
      Date: form.addReminderForm.date.value,
      Title: form.addReminderForm.title.value,
      Note: form.addReminderForm.note.value,
    };

    if (existing) {
      url = `/api/updatePetReminder/${petId}/${reminderId}`;
    } else {
      url = `/api/addPetReminder/${petId}`;
    }

    return cb(url, vals, petId);
  };

  const handleAddReminders = async (vals, url) => {
    try {
      console.log("trying", vals);
      let url = `/api/addPetReminder/${petId}`;
      console.log(url);
      let resp = await axios.put(url, vals, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      newData = await getPetData(petId);
      handleClose();
      console.log(resp);
    } catch (err) {
      console.log(err);
      toast.error(err.response);
    }
  };

  const updateReminders = async (e, ReminderId) => {
    e.preventDefault();
    //show the modal dialog
    //get the dialog from the form  and allow update of individual note
    console.log("button to update reminders", ReminderId);
  };

  const buttonStyle = {
    backgroundColor: "rgb(255, 100, 100)",
  };

  return (
    <div className="card m-2">
      <div className="card-body text-center ">
        <h3 className="card-title">Reminders</h3>
        <div className="pet-table">
          <ul>
            {reminders.map((rem) => (
              <li
                onClick={(e) => updateReminders(e, rem._id)}
                key={rem._id}
                className="pet-list btn"
              >
                <div>
                  {rem.ReminderName}
                  <Moment format="MM/DD/YYYY">{rem.Date}</Moment>
                </div>
                &nbsp; {rem.Title}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleShow}
          style={buttonStyle}
          className=" btn btn-circle btn-xl"
        >
          +
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddReminder petId={petId} data={modalData} existing={false} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={(e) => handleAddReminders(e, document.forms)}
            >
              Submit Form
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Reminders;
