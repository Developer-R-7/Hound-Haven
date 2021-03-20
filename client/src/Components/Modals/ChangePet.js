import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import PetContext from "../../Context/PetContext";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";

const ChangePet = (props) => {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  
  //state for new pet data to be added to db
  console.log(props.data)
  const [newPet, setnewPet] = useState(null);
  const [PetImageLoc, setPetImgLoc] = useState(null);
  const { newPetData, setNewPetData } = useContext(PetContext);
  const pet= props.data;
  const history = useHistory();

  useEffect(() => {
    pet && setnewPet(pet);
  }, [pet])

  useEffect(()=>{
    newPetData &&
    history.push({
      pathname: "/petDash",
      state: { info: newPetData },
    });
  }, [newPetData])

  //handle change of form data to be set for newPet state
  const handleChange = (e) => {
    setnewPet({ ...newPet, [e.target.name]: e.target.value });
  };

  const updatePet = async (e) => {
    newPet.PetImageLoc = PetImageLoc;
    e.preventDefault();
    try {
      const pet = await axios.patch("/api/updatepet/"+newPet._id, newPet, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      })
      setNewPetData(true);

    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    try {
                const [file] = e.target.files;
                if (file) {
                  const reader = new FileReader();
                  const { current } = uploadedImage;
                  current.file = file;
                  reader.onload = e => {
                  current.src = e.target.result;
                  }
                  reader.readAsDataURL(file);                 
                  const formData = new FormData();
                  formData.append('file', file);
                  await axios.post('/api/saveImage', formData,
                  {headers: { "x-auth-token": localStorage.getItem("auth-token")}
                  }).then(data => {
                    console.log(data.data);
                    setPetImgLoc(data.data);
                  })
                }  
    } catch (error) {
       console.log(error)
    }
  } 

  return (
    <div className="modal" id="editAPetModal" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            style={{ display: "inline-flex", justifyContent: "center" }}
            className="modal-body"
          >
            <form>

              <div className="form-group">
                <label>Photo/avatar</label>
                <br />

                <div
                  style={{
                    height: "60px",
                    width: "60px",
                    border: "1px dashed black",
                    borderRadius: "100%",

                  }}
                  onClick={() => imageUploader.current.click()}
                >
                  <img
                    ref={uploadedImage}
                    style={{
                      height: "60px",
                      width: "60px",
                      border: "none",
                      borderRadius: "100%",
                    }}/>
                </div>
                <input
                  onChange={(e) => handleImage(e)}
                  ref={imageUploader}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  name="PetImageLoc"
                  style={{
                    display: "none"
                  }}/>
      </div>
              <p></p>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  placeholder="Pet name"
                  name="PetName"
                  type="text"
                  defaultValue={newPet && newPet.PetName}
                  
                />
              </div>
              <div className="form-group">
                <label>Birth Date</label>
                <br />
                <input
                  onChange={handleChange}
                  placeholder="Birth Date"
                  name="BirthDate"
                  type="date"
                  defaultValue={newPet && <Moment format="MM/DD/YYYY">{newPet.BirthDate}</Moment>}
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  placeholder="Gender"
                  name="Gender"
                  type="text"
                  defaultValue={newPet && newPet.Gender}
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  placeholder="Type"
                  name="TypeOfPet"
                  type="text"
                  defaultValue={newPet && newPet.TypeOfPet}
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  placeholder="Breed"
                  name="Breed"
                  type="text"
                  defaultValue={newPet && newPet.Breed}
                />
              </div>
            </form>
          </div>
          <div
            onClick={updatePet}
            className="modal-footer"
            data-bs-dismiss="modal"
          >
            <button type="submit" className="btn btn-primary">
              Save Pet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePet;
