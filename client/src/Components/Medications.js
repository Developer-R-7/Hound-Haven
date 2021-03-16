import React from "react";
import { useState } from "react";
import Moment from 'react-moment'
import AddMeds from "./Modals/AddMeds";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";



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

    //sort descending so the newest one on the top
    meds.sort(function(a, b){
        var nameA=a.DueDate, nameB=b.DueDate
        if (nameA < nameB) //sort string ascending
            return 1
        if (nameA > nameB)
            return -1
        return 0 //default return value (no sorting)
    })

 


    const  handleAddMed = async (e, form) => {
        e.preventDefault();
        //show the modal dialog
        //get the dialog from the form
        //do the calclations and add the medications

        let medName = form.addMedForm.medication.value;
        let medDate = form.addMedForm.startDate.value;
        // these can be made available if we want the user to add medications that are needed for example monthly
        // let medFreq = form.addMedForm.frequency.value;
        // let medNmDoses = form.addMedForm.numDoses.value;
        let medDose = form.addMedForm.dose.value;
        
        const vals = {
            MedicationName: medName,
            DueDate: medDate,
            Dose: medDose
        }
    
         try {
			console.log("trying", vals);
            let url=`/api/addpetmed/${petId}`;
            console.log(url)
			let resp = await axios.put(url, vals,
            { headers: { "x-auth-token": localStorage.getItem("auth-token") } });
            handleClose();
            console.log(resp)
		} catch (err) {
            console.log(err)
			toast.error(err.response);
		}
      
        
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
                    <div class="pet-table">
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
                                    &nbsp; {med.Dose}
                                </li>
                                ))}
                            </ul>      
                    </div>           
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
