import React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../Context/UserContext";
import VetVisits from "../Components/VetVisits";
import Medications from "../Components/Medications";
import Reminders from "../Components/Reminders";
import Moment from "react-moment";
import ChangePet from "../Components/Modals/ChangePet";
import PetContext from "../Context/PetContext";
import { getPetData } from "../Components/Helpers/PetFunctions";

const PetDash = () => {
  const { petId, setPetId } = useContext(PetContext);
  const { userData } = useContext(UserContext);
  const [data, setData] = useState();
  const [img] = useState();
  const history = useHistory();
  const location = useLocation();
  const { newPetData, setNewPetData } = useContext(PetContext);
  //let petId;

  // useEffect(() => {
  //   console.log(location.state.info)
  //   setData(location.state.info); // added this to refersh after update
  // }, [location, newPetData,setData]);

  setNewPetData(false);

  // useEffect(() => {
  //   data ? console.log(data) : console.log("no Data");
  //   data ? (setPetId(data._id)) : setPetId("");
  // }, [data,setPetId]);

  useEffect( () => {
    const  fetchMyAPI = async () => {
      const data = await getPetData(petId);
      data && setData(data);
    }
    fetchMyAPI()
  }, [newPetData,petId]);


	useEffect(() => {}, [img]);


  useEffect(() => {
    if (!userData.user) history.push("/");
  }, [userData.user, history]);

  // const buttonStyle = {
  //   backgroundColor: "rgb(255, 100, 100)",
  // };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          {data && (
            <div className="col-sm-3 py-5">
              <div className="card m-2 shadow rounded">
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
                      // style={buttonStyle}
                      data-bs-toggle="modal"
                      data-bs-target="#editAPetModal"
                      type="button"
                      className="edit-pet-btn btn btn-xl"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <ChangePet data={data} />
          <div className="pet-dash-cards col-sm-9 py-5">
            <div className="row">
              {data && (
                <Reminders petI={data._id} Reminders={data.Reminders} />
              )}
              {data && (
                <VetVisits petI={data._id} VetVisits={data.VetVisits} />
              )}
              {data && <Medications petI={data._id} meds={data.Medications} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDash;
