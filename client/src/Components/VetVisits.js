import React from "react";
import { useState, useEffect } from "react";
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
    // const [form, setForm] = useState({});
    const [isOpen, setIsOpen] = useState(true);
	const [show, setShow] = useState(false);
    const [modalData,setModalData] = useState(null);

    useEffect(() => {
        modalData && setShow(true)
    },[modalData])

    // const onChange = (e) => {
	// 	setForm({ ...form, [e.target.name]: e.target.value });
	// };
 
	const handleClose = () => setShow(false);
	const handleShow = (e,data) => {
        if(e.target.name !== 'addVisitBtn') setModalData (data)
        setShow(true)
      };

    visits.sort(function(a, b){
        var nameA=a.VisitDate, nameB=b.VisitDate
        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })
    const  handleAddUpdateVisit = async (e, form) => {
        e.preventDefault();
        console.log("from click",form.addVisitForm)
        // setForm({  ...form.addVisitForm, [e.target.name]: e.target.value });
         let  visitId = form.addVisitForm.visitId.value
        const vals = {
            VisitDate: form.addVisitForm.VisitDate.value,
            VisitNotes: form.addVisitForm.VisitNotes.value
        }
       // if ID is zero then it is a new visit....
       let url = `/api/addpetvisit/${petId}`
       if (visitId !== 0) {
           url =  `/api/updatepetvisit/${petId}/${visitId}`
       }
        try {
			console.log("trying", vals);
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
    
    const update = async (e,data) => {
        e.preventDefault();
        setModalData(data)
        //show the modal dialog
        //get the dialog from the form  and allow update of individual note
        console.log('button to update visit',data)
    }
   
            
    const add = async (e,data) => {
        e.preventDefault();
        console.log(e)
        //show the modal dialog
        //get the dialog from the form  and allow update of individual note
        setModalData(data)
        console.log('button to add visit',data)
    }
    const submit = async (e) => {
		e.preventDefault();
       // console.log("submit",form);
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
                             name="editVisitBtn" 
                             onClick={(e) => update(e, visit)}
                                 key={visit._id}
                                 className="pet-list btn">
                                 <div>
                                 <Moment format="MM/DD/YYYY" >
                                     {visit.VisitDate}
                                 </Moment>
                                 </div> 
                                 &nbsp; {visit.VisitNotes}
                            </li>
                             ))}
                         </ul>      
                 </div>           
             <button
            name="addVisitBtn" 
            onClick={(e) => add(e,'{_id: 0}')}
                 style={buttonStyle}
                 className=" btn btn-circle btn-xl">
                     +
             </button>   
                 <Modal show={show} onHide={handleClose}>
                 <Modal.Header closeButton>
                     <Modal.Title>Modal heading</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     <AddVisit petId={petId} data={modalData}/>
                 </Modal.Body>
                 <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                             Close
                         </Button>
                         <Button variant="primary" onClick={(e) => handleAddUpdateVisit(e, document.forms)}>
                             Submit Form
                         </Button>
                         </Modal.Footer>
                 </Modal>
         </div>
     </div>
    )
}

export default VetVists
