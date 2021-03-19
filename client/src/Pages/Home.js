import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddPet from "../Components/Modals/AddPet";
import UserContext from "../Context/UserContext";
import PetContext from "../Context/PetContext";
import axios from "axios";
import PetDash from "./PetDash";
import { Route, Link } from "react-router-dom";
import { set } from "mongoose";

//return data from user, append any saved pets as buttons
//when a saved pets button is clicked ..routes to that pets dash
//add button to add a pet which stores to DB and appends that pet as a button in pets list

const Home = () => {
  const { userData } = useContext(UserContext);
  const { newPetData, setNewPetData } = useContext(PetContext);
  const history = useHistory();
  const [pets, setUserPets] = useState([]);
  const [user] = useState(userData.user?.id);
  const [petData, setPetData] = useState();
  const [petAlert, setPetAlert] = useState({});

  //not sure if this is the way to go about getting users pets?
  const loadUserPets = async (user) => {
    console.log(user);
    let url = `/api/getpetbyuser/${user}`;
    let token = localStorage.getItem("auth-token");
    console.log(url);
    console.log(token);
    try {
      const { data } = await axios.get(url, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      data && setUserPets(data);
      setNewPetData(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userData.user) history.push("/login");
  }, [userData.user, history]);

  useEffect(() => {
    loadUserPets(user);
  }, [user, newPetData]);

  // useEffect(() => {
  //   loadUserPets(user);
  // }, [newPetData]);

  useEffect(() => {
    petData &&
      history.push({
        pathname: "/petDash",
        state: { info: petData },
      });
  }, [petData]);

  const deletePet = async (e, id) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/api/pet/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      loadUserPets(user);
    } catch (error) {
      console.log(error);
    }
  };

  const routePet = async (e, id) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/pet/${id}`,

        { headers: { "x-auth-token": localStorage.getItem("auth-token") } }
      );
      data && setPetData(data);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  const newCalendar = async () => {
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    pets.forEach((pet) => {
      console.log(pet);
    });
  };

  newCalendar();

  //map user data and send pets as buttons in list items
  return (
    <>
      <div className="container pets-container">
        <div className="row">
          <div className="col-xs-12 py-5">
            <div className="header-styles">
              <h2 className="myPet-header">My Pet</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 py-5">
            {pets ? (
              <div>
                {console.log(pets)}
                {pets.map((pet, i) => (
                  <div>
                    <button
                      onClick={(e) => routePet(e, pet._id)}
                      key={pet._id}
                      type="button"
                      className="pet-list-btns saved-pet-btn btn"
                    >
                      {pet.PetName}
                    </button>
                    <button
                      onClick={(e) => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this item?"
                          )
                        )
                          deletePet(e, pet._id);
                      }}
                      key={i}
                      type="button"
                      className=" delete-pet-btn btn"
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <h2>Click the "+" to add your pets!</h2>
            )}
          </div>
        </div>
        <div className="add-new-pet">
          <button
            data-bs-toggle="modal"
            data-bs-target="#addAPetModal"
            type="button"
            className="add-pet-btn btn btn-circle btn-xl"
          >
            +
          </button>
        </div>
      </div>

      <AddPet />
    </>
  );
};

export default Home;
