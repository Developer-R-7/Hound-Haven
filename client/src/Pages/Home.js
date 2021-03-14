import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddPet from "../Components/Modals/AddPet";
import UserContext from "../Context/UserContext";

//return data from user, append any saved pets as buttons
//when a saved pets button is clicked ..routes to that pets dash
//add button to add a pet which stores to DB and appends that pet as a button in pets list

const Home = () => {
	const { userData } = useContext(UserContext);
	const history = useHistory();
	// const [pets, setUserPets] = useState([]);

	//not sure if this is the way to go about getting users pets?
	// function loadUserPets(userID) {
	//   API.getPetsByUser(userID)
	//     .then((res) => setUserPets(res.data))
	//     .catch((err) => res.send(err));
	// }

	// useEffect(() => {
	//   loadUserPets();
	// }, []);

	useEffect(() => {
		if (!userData.user) history.push("/login");
	}, [userData.user, history]);

	//map user data and send pets as buttons in list items
	return (
		<>
			<div className="container pets-container">
				<div className="row">
					<div className="col-lg-6 col-xs-12 py-5">
						<div className="header-styles">
							<h2 className="myPet-header">My Pet</h2>
						</div>
						{/* placeholder button for now */}
						<button type="button" className="saved-pet-btn btn">
							Georgina
						</button>
						{/* {pets.length ? (
            <ul>
              {pets.map((pet) => (
                <li className="pet-list" key={pet.id}>
                  <button type="button" className="saved-pet-btn btn">
                    {pet.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <h2>Click the "+" to add your pets!</h2>
          )} */}
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
