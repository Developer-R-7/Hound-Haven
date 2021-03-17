import React from "react";
import { useState, useEffect } from "react";
import Moment from 'react-moment'
import AddVisit from "./Modals/AddVisit";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import {  getPetData } from './Helpers/PetFunctions'


    const VetVists = (props) => {
    let newData = props;
    const petId = props.petId;
    const [visits,setVisits] = useState(newData.VetVisits); 
    const [existing, setExisting] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
	const [show, setShow] = useState(false);
    const [modalData,setModalData] = useState(null);

    useEffect(() => {
        modalData && setShow(true)
    },[modalData])


    useEffect(() => {
        setVisits(newData.VetVisits)

    }, [newData]);  
     
 
	const handleClose = () => setShow(false);
	const handleShow = (e,data) => {
        if(e.target.name !== 'addVisitBtn') setModalData (data)
        setShow(true)
      };

    visits.sort(function(a, b){
        var nameA=a.VisitDate, nameB=b.VisitDate
        if (nameA < nameB) //sort string ascending
            return 1
        if (nameA > nameB)
            return -1
        return 0 //default return value (no sorting)
    })
    const  handleAddUpdateVisit = async (e, form,cb) => {
        e.preventDefault();
        console.log("from click",form.addVisitForm)
        let url; 
            let visitId = form.addVisitForm.visitId.value
        const vals = {
            VisitDate: form.addVisitForm.VisitDate.value,
            VisitNotes: form.addVisitForm.VisitNotes.value
        }
  
        if (existing) {
            url =  `/api/updatePetVisit/${petId}/${visitId}`
        } else {url = `/api/addPetVisit/${petId}` }
 
        return cb(url,vals,petId)
    }

     
    const postVisit = async (url, vals,petId) =>  {
         try {
			// console.log("trying", vals);
            // console.log(url)
			let resp = await axios.put(url, vals,
            { headers: { "x-auth-token": localStorage.getItem("auth-token") } });
            newData =  await getPetData(petId)
            handleClose();      
		} catch (err) {
            console.log(err)
			toast.error(err.response);
		}
    
    }
    
    const update = async (e,data) => {
        e.preventDefault();
        setModalData(data)
        setExisting(true)
        //show the modal dialog
        //get the dialog from the form  and allow update of individual note
        console.log('button to update visit',data)
    }
   
            
    const add = async (e,data) => {
        e.preventDefault();
        setExisting(false)
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
                 <div className="pet-table">
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
                     <Modal.Title>Add / Edit a Vet Visit</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     <AddVisit petId={petId} data={modalData} existing={false}/>
                 </Modal.Body>
                 <Modal.Footer>
                         <Button variant="primary" onClick={(e) => handleAddUpdateVisit(e, document.forms, postVisit)}>
                             Submit Form
                         </Button>
                         </Modal.Footer>
                 </Modal>
         </div>
     </div>
    )
}

export default VetVists
