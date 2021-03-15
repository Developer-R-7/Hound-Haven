import React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory,useLocation } from "react-router-dom";
import Moment from 'react-moment'
import ReactDOM from 'react-dom';
import AddMeds from "./Modals/AddMeds";
import { Button, Modal } from "react-bootstrap";



const Medications = (props) => {

    //const {isShowing, toggle} = useModal();

    console.log(props);
    const petId = props.petId;
    const [meds,setMeds] = useState(props.meds); 
    const [addMed, setAddMed] = useState();
    const [form, setForm] = useState({});
    const [isOpen, setIsOpen] = useState(true);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// const onChange = (e) => {
	// 	setForm({ ...form, [e.target.name]: e.target.value });
	// };

    console.log(meds);

    const  handleAddMed = async (e, form) => {
        let medName = form.addMedForm.medication.value;
        let medDate = form.addMedForm.startDate.value;
        let medFreq = form.addMedForm.frequency.value;
        let medNmDosrs = form.addMedForm.numDoses.value;
        let medDose = form.addMedForm.dose.value;
        if (medDose === 1){
        setAddMed({
            MedicationName: medName,
            DueDate: medDate,
            Dose: medDose
        })
        console.log(addMed)
        }

        
        e.preventDefault();
        //show the modal dialog
        //get the dialog from the form
        //do the calclations and add the medications
  
    
    }
    const updateMed = async (e,meid) => {
        e.preventDefault();
        //show the modal dialog
        //get the dialog from the form
        //do the calclations and add the medications
        console.log('button to update medication',meid)
    }
   

    const buttonStyle = {
        backgroundColor: "rgb(255, 100, 100)",
    };
    
    
    return (
        <div className="card m-2">
           <div className="card-body text-center">
            <h3 className="card-title">Medications</h3>
               <ul>
                {meds.map((med) => (
                    <li
                    onClick={(e) => updateMed(e)}
                        key={med._id}
                        className="pet-list btn">
                        {med.MedicationName} &nbsp;
                       Next Dose: &nbsp; 
                        <span>
                        <Moment format="MM/DD/YYYY">
                            {med.DueDate}
                        </Moment>
                        </span> 
                    </li>
                    ))}
                </ul>      

                <button
               onClick={handleShow}
                    style={buttonStyle}
                    className=" btn btn-circle btn-xl">
                        +
                </button>
           
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <AddMeds petId={petId}/>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={(e) => handleAddMed(e,  document.forms)}>
                                Submit Form
                            </Button>
                            </Modal.Footer>
                    </Modal>

            </div>
     
        </div>
       


    )
}

export default Medications
