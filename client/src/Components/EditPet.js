import React from 'react'
import Moment from 'react-moment'
import UserContext from "../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useHistory,useLocation } from "react-router-dom";




const EditPet = () => {
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


 
	const handleClose = () => {
        setShow(false);
        getPetData(petId)
        .then(data => setVisits(data.VetVisits))
    }
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
  
    const  handleDelVisit = async (e, form) => {
        e.preventDefault();
            let visitId = form.addVisitForm.visitId.value
            let url =  `/api/delPetVisit/${petId}/${visitId}`
            try {
            let resp = await axios.put(url, 
                { headers: { "x-auth-token": localStorage.getItem("auth-token") } }); 
            } catch (err) {
                console.log(err)
                toast.error(err.response);
            }
            
    }




     
    const postVisit = async (url, vals,petId) =>  {
     
         try {
			let resp = await axios.put(url, vals,
            { headers: { "x-auth-token": localStorage.getItem("auth-token") } });         
            handleClose();      
		} catch (err) {
            console.log(err)
			toast.error(err.response);
		}

    
    }
    


    useEffect(() => {
       
   }, [handleClose]);  

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
    const { userData } = useContext(UserContext);
    const [data,setData] =  useState()
    const history = useHistory();
    const location = useLocation();
  
    useEffect(() => {
      console.log(location.state.info); 
      setData(location.state.info) // petdata
   }, [location]);
  
  
    useEffect(() => {
      if (!userData.user) history.push("/");
    }, [userData.user, history]);
  
    const buttonStyle = {
      backgroundColor: "rgb(255, 100, 100)",
    };
  
    return (
        <div>
            {data &&
            <div className="col-sm-3">
            
                <div className="card m-2">
                <img
                    src={data.PetImageLoc}
                    className="card-img-top"
                    alt="petImage"
                ></img>

                <div className="card-body text-center">
                    <h1 className="card-title">{data.PetName}</h1>
                    <h4 className="card-title">
                    Birth Date: &nbsp;  
                    <Moment format="MM/DD/YYYY">
                        {data.BirthDate}
                    </Moment>
                    </h4>
                    <h4 className="card-title">{data.Gender}</h4>
                    <h4 className="card-title">{data.Breed}</h4>

                    <button style={buttonStyle} className="btn">
                    Edit
                    </button>
                </div>
                </div>
            </div>
            } 
            </div>
        )
    }

    export default EditPet
