import axios from "axios";
import UserContext from "../../Context/UserContext";
import PetContext from "../../Context/PetContext";
import React, { useContext, useEffect, useState } from "react";

const ConfirmDelete = (props) => {
  const { userData } = useContext(UserContext);
  const { setNewPetData } = useContext(PetContext);
  const { setPets } = useContext(PetContext);
  const { petId, setPetId } = useContext(PetContext);
  //const [setUserPets] = useState([]);
  const [user] = useState(userData.user?.id);


  useEffect(() => {
    const loadUserPets = async (user) => {
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
    loadUserPets(user);
}, [setNewPetData,setPets,user]);





	const deletePet = async (e) => {
		e.preventDefault();

    try {
      await axios.delete(`/api/pet/${petId}`, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      setPetId("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="confirmDelete" className="modal fade">
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header flex-column">
            <div className="icon-box">
              <i className="fa fa-times-circle"></i>
            </div>
            <h4 className="modal-title w-100">Are you sure?!</h4>
          </div>
          <div className="modal-body">
            <p>Do you really want to delete this pet? This cannot be undone.</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <div onClick={deletePet} data-bs-dismiss="modal">
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ConfirmDelete;
