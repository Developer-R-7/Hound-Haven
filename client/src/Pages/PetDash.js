import React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory,useLocation } from "react-router-dom";
import UserContext from "../Context/UserContext";

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

              <div className="card-body">
           
                <h1 className="card-title">Pet Info</h1>
                <h4 className="card-title">{data.PetName}</h4>
                <h4 className="card-title">{data.BirthDate}</h4>
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
              <div className="card m-2">
                <div className="card-body">
                  <h2 className="card-title">Weight Chart</h2>
                  <p className="card-text">
                    Graph goes here
                  </p>
                  <button
                    style={buttonStyle}
                    className=" btn btn-circle btn-xl"
                  >
                    Edit
                  </button>
                </div>
              </div>{" "}
              <div className="card m-2">
                <div className="card-body">
                  <h2 className="card-title">Vet Visits</h2>
                  <p className="card-text">
                    Vet dates with notes go here
                  </p>
                  <button
                    style={buttonStyle}
                    className=" btn btn-circle btn-xl"
                  >
                    Edit
                  </button>
                </div>
              </div>{" "}
              <div className="card m-2">
                <div className="card-body">
                  <h2 className="card-title">Medications</h2>
                  <p className="card-text">
                   Medication name, dose, frequency go here
                  </p>
                  <button
                    style={buttonStyle}
                    className=" btn btn-circle btn-xl"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDash;
