import React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory,useLocation } from "react-router-dom";
import UserContext from "../Context/UserContext";
import VetVisits from "../Components/VetVisits";
import Medications from "../Components/Medications";
import PetVitals from "../Components/PetVitals";
import Moment from 'react-moment'

const PetDash = () => {
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
    <div className="container-fluid">
      <div className="container">
        <div className="row">
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
          <div className="col-sm-9">
            <div className="row">

            {data && <PetVitals petId={data._id} vitals={data.Vitals} />}
            {data && <VetVisits  petId={data._id}  visits={data.VetVisits} />}
            {data && <Medications  petId={data._id} meds={data.Medications} />}
          
    
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDash;
