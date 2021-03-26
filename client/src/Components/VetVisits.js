import React from "react";
import { useState, useEffect,useContext } from "react";
import Moment from "react-moment";
import AddVisit from "./Modals/AddVisit";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { getPetData } from "./Helpers/PetFunctions";
import PetContext from "../Context/PetContext";

const VetVists = (props) => {
  let newData = props;
  const { petId, setPetId } = useContext(PetContext);
  const [visits, setVisits] = useState(newData.VetVisits);
  const [existing, setExisting] = useState(false);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  setPetId(props?.petI)

  const handleClose = () => {
    setShow(false);
    getPetData(petId).then((data) => setVisits(data.VetVisits));
  };

  visits.sort(function (a, b) {
    var nameA = a.VisitDate,
      nameB = b.VisitDate;
    if (nameA < nameB)
      //sort string ascending
      return 1;
    if (nameA > nameB) return -1;
    return 0; //default return value (no sorting)
  });

  const handleAddUpdateVisit = async (e, form, cb) => {
    e.preventDefault();
    let url;
    let visitId = form.addVisitForm.visitId.value;
    const vals = {
      VisitDate: form.addVisitForm.VisitDate.value,
      VisitNotes: form.addVisitForm.VisitNotes.value,
    };

    if (existing) {
      url = `/api/updatePetVisit/${petId}/${visitId}`;
    } else {
      url = `/api/addPetVisit/${petId}`;
    }
    return cb(url, vals);
  };

  const handleDelVisit = async (e, form, cb) => {
    e.preventDefault();
    let visitId = form.addVisitForm.visitId.value;
    let vals = {};
    let url = `/api/delPetVisit/${petId}/${visitId}`;
    return cb(url, vals);
  };

  const postVisit = async (url, vals) => {
    try {
      await axios.put(url, vals, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error(err.response);
    }
  };

  /// just rerender after
  useEffect(() => {}, [handleClose]);

  const update = async (e, data) => {
    e.preventDefault();
    setModalData(data);
    setExisting(true);
    setShow(true);
  };

  const add = async (e, data) => {
    e.preventDefault();
    setExisting(false);
    setShow(true);
    setModalData(data);
  };

  return (
    <div className="card m-2 shadow rounded" id="petDashCard">
      <div className="card-body text-center">
        <h3 className="card-title">Vet Visits</h3>
        <div className="pet-table">
          <ul className="overflow-auto">
            {visits.map((visit) => (
              <div key={visit._id} className="container py-1">
                <li
                  name="editVisitBtn"
                  onClick={(e) => update(e, visit)}
                  className="pet-list btn w-75"
                >
                  <div>
                    <Moment utc format="MM/DD/YYYY">
                      {visit.VisitDate}
                    </Moment>
                  </div>
                  &nbsp; {visit.VisitNotes}
                </li>
              </div>
            ))}
          </ul>
        </div>
        <button
          name="addVisitBtn"
          onClick={(e) => add(e, "{_id: 0}")}
          className="edit-visis-btn btn btn-circle shadow"
        >
          <i className="fa fa-plus my-float"></i>
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add or Edit a Vet Visit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddVisit petId={petId} data={modalData} existing={false} />
          </Modal.Body>
          <Modal.Footer>
            {existing ? (
              <Button
                className="delete-saved-entry"
                onClick={(e) => handleDelVisit(e, document.forms, postVisit)}
              >
                Remove Visit
              </Button>
            ) : null}
            <Button
              className="save-updated-entry"
              onClick={(e) =>
                handleAddUpdateVisit(e, document.forms, postVisit)
              }
            >
              Submit Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default VetVists;
