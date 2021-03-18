import React from 'react'

const ChangePet = () => {
	return (
			   <div className="modal" id="addAPetModal" tabIndex="-1">
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
                    border: "2px dashed black",
                    borderRadius: "100%",
                  }}
                >
                  <img
                    style={{
                      position: "absolute",
                    }}
                  />
                </div>
                <input
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  name="PetImageLoc"
                />
              </div>
              <p></p>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  placeholder="Pet name"
                  name="PetName"
                  type="text"
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
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  placeholder="Gender"
                  name="Gender"
                  type="text"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  placeholder="Type"
                  name="TypeOfPet"
                  type="text"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  placeholder="Breed"
                  name="Breed"
                  type="text"
                />
              </div>
            </form>
          </div>
          <div
            onClick={saveNewPet}
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
	)
}

export default ChangePet
