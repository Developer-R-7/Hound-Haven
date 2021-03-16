import React from "react";
import { useState } from "react";
import Moment from 'react-moment'
import AddVisit from "./Modals/AddVisit";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";


    const VetVists = (props) => {
    console.log(props);
    const petId = props.petId;
    const [visits,setVisits] = useState(props.visits); 
    const [addVisit, setAddVisit] = useState();
    const [form, setForm] = useState({});
    const [isOpen, setIsOpen] = useState(true);
	const [show, setShow] = useState(false);
 
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    visits.sort(function(a, b){
        var nameA=a.VisitDate, nameB=b.VisitDate
        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })
    const  handleAddVisit = async (e, form) => {
        e.preventDefault();
        //show the modal dialog
        //get the dialog from the form
        //do the calclations and add the medications
        /// this time can try the spread <div className="
        setForm({  ...form.addVisitForm, [e.target.name]: e.target.value });

        const vals = {
            VisitDate: form.addVisitForm.VisitDate.value,
            VisitNotes: form.addVisitForm.VisitNotes.value
        }
     
        // these can be made available if we want the user to add medications that are needed for example monthly
        // let medFreq = form.addMedForm.frequency.value;
        // let medNmDoses = form.addMedForm.numDoses.value;
     
       
        try {
			console.log("trying", vals);
            let url=`/api/addpetvisit/${petId}`;
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

        
    const updateVisit = async (e,VisitId) => {
        e.preventDefault();
        //show the modal dialog
        //get the dialog from the form  and allow update of individual note
        console.log('button to update medication',VisitId)
    }
   


    const buttonStyle = {
        backgroundColor: "rgb(255, 100, 100)",
    };
    
    return (
        <div className="card m-2">
        <div className="card-body text-center ">
         <h3 className="card-title">Visits</h3>
                 <div class="pet-table">
                     <ul>
                         {visits.map((visit) => (
                             <li
                             onClick={(e) => updateVisit(e, visit._id)}
                                 key={visit._id}
                                 className="pet-list btn">
                                 <div>
                                 <Moment format="MM/DD/YYYY">
                                     {visit.VisitDate}
                                 </Moment>
                                 </div> 
                                 &nbsp; {visit.VisitNotes}
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
                     <AddVisit petId={petId}/>
                 </Modal.Body>
                 <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                             Close
                         </Button>
                         <Button variant="primary" onClick={(e) => handleAddVisit(e,  document.forms)}>
                             Submit Form
                         </Button>
                         </Modal.Footer>
                 </Modal>

         </div>
  
     </div>
    

    )
}

export default VetVists
