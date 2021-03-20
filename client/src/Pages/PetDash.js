import React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../Context/UserContext";
import VetVisits from "../Components/VetVisits";
import Medications from "../Components/Medications";
import Reminders from "../Components/Reminders";
import Moment from "react-moment";

const PetDash = () => {
  const { userData } = useContext(UserContext);
  const [data, setData] = useState();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.info);
    setData(location.state.info); // petdata
  }, [location]);

  useEffect(() => {
    if (!userData.user) history.push("/");
  }, [userData.user, history]);

  const buttonStyle = {
    backgroundColor: "rgb(255, 100, 100)",
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#9F939A" }}>
      <div className="container">
        <div className="row">
          {data && (
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
                    <Moment format="MM/DD/YYYY">{data.BirthDate}</Moment>
                  </h4>
                  <h4 className="card-title">{data.Gender}</h4>
                  <h4 className="card-title">{data.Breed}</h4>

                <div className="edit-new-pet">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#editAPetModal"
                    type="button"
                    className="edit-pet-btn btn btn-xl"
                  >
                  <button style={buttonStyle} className="btn">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )
        
          </div>}
          <ChangePet data= {data}/>
          <div className="col-sm-9">
            <div className="row">
              {data && (
                <Reminders petId={data._id} Reminders={data.Reminders} />
              )}
              {data && (
                <VetVisits petId={data._id} VetVisits={data.VetVisits} />
              )}
              {data && <Medications petId={data._id} meds={data.Medications} />}
            </div>
          </div>
        </div>
    </div>
  </div>

  );
};

export default PetDash;
