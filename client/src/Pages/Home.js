import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddPet from "../Components/Modals/AddPet";
import UserContext from "../Context/UserContext";
import PetContext from "../Context/PetContext";
import axios from "axios";
import ConfirmDelete from "../Components/Modals/ConfirmDelete";


//return data from user, append any saved pets as buttons
//when a saved pets button is clicked ..routes to that pets dash
//add button to add a pet which stores to DB and appends that pet as a button in pets list

const Home = () => {
  const { userData } = useContext(UserContext);
  const { newPetData, setNewPetData } = useContext(PetContext);
  const { petId, setPetId } = useContext(PetContext);
  const history = useHistory();
  //const [pets, setUserPets] = useState([]);
  const { pets, setPets } = useContext(PetContext);
  const [user] = useState(userData.user?.id);
  const [petData, setPetData] = useState();
  
  console.log(pets);
  //not sure if this is the way to go about getting users pets?
  const loadUserPets = async (user) => {
    console.log(user);
    let url = `/api/getpetbyuser/${user}`;
    try {
      const { data } = await axios.get(url, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      data && setPets(data);
      setNewPetData(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userData.user) history.push("/login");
  }, [userData.user, history]);

  useEffect(() => {
    user && loadUserPets(user);
  }, [user,newPetData, petId]);

  useEffect(() => {
    petData &&
      history.push({
        pathname: "/petDash",
        state: { info: petData },
      });
  }, [petData,history]);

  const routePet = async (e, id) => {
    // we already had the data no need to go back to the DB
    e.preventDefault();
    let thisPet = pets.filter(((pet) => {return pet._id === id}));
    setPetData(thisPet[0]);
    console.log("here", petData);
  };

 

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
              <div>
              {pets.length > 0  && pets.map((pet, i) => (
                  <div>
                    <button
                      onClick={(e) => routePet(e, pet._id)}
                      key={pet._id}
                      type="button"
                      className="pet-list-btns saved-pet-btn btn"
                    >
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "100%",
                        }}
                        src={pet.PetImageLoc}
                      />
                     &nbsp;&nbsp;&nbsp;&nbsp;
                      {pet.PetName}
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDelete"
                      onClick={(e) => {
                        setPetId(pet._id);
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
            
            { pets.length === 0  && 
              <h2>Click the "+" to add your pets!</h2>
            }
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
      <ConfirmDelete />
      <AddPet />
    </>
  );
};

export default Home;
