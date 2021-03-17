import React from 'react';
import { useState } from "react";
import Moment from 'react-moment'
import AddReminder from "./Modals/AddReminder";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

    const PetVitals = (props) => {
    console.log(props);
    const petId = props.petId;
    const [reminders,setReminders] = useState(props.reminders); 
    const [addVitals, setAddVitals] = useState();
    const [form, setForm] = useState({});
    const [isOpen, setIsOpen] = useState(true);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);



    const  handleAddVitals = async (e, form) => {
        e.preventDefault();
        setForm({  ...form.addVitalsForm, [e.target.name]: e.target.value });

        const vals = {
            WeightDate: form.addVitalsForm.WeightDate.value,
            VitalWeight: form.addVitalsForm.VitalWeight.value
        }

        try {
			console.log("trying", vals);
            let url=`/api/addpetvital/${petId}`;
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

    const updateVitals = async (e,VitalsId) => {
        e.preventDefault();
        //show the modal dialog
        //get the dialog from the form  and allow update of individual note
        console.log('button to update vitals',VitalsId)
    }
   

    const buttonStyle = {
        backgroundColor: "rgb(255, 100, 100)",
    };
    
    return (
        <div className="card m-2">
        <div className="card-body text-center ">
            <h3 className="card-title">Reminders</h3>
                    <div class="pet-table">
                        <ul>
                            {reminders.map((rem) => (
                                <li
                                onClick={(e) => updateVitals(e, reminders._id)}
                                    key={rem._id}
                                    className="pet-list btn">
                                    <div>
                                    <Moment format="MM/DD/YYYY">
                                        {rem.Date}
                                    </Moment>
                                    </div> 
                                    &nbsp; {rem.Title}
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
                        <AddReminder petId={petId}/>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={(e) => handleAddVitals(e,  document.forms)}>
                                Submit Form
                            </Button>
                            </Modal.Footer>
                    </Modal>

        </div>
  
    </div>
    

    )
}

export default PetVitals
