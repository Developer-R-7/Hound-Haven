import React from "react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";

const PetDash = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  // useEffect(() => {
  //   if (!userData.user) history.push("/login");
  // }, [userData.user, history]);

  const buttonStyle = {
    backgroundColor: "rgb(255, 100, 100)",
  };
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="card">
              <img
                src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081"
                className="card-img-top"
                alt="petImage"
              ></img>
              <div className="card-body">
                <h1 className="card-title">Pet Info</h1>
                <h4 className="card-title">Name</h4>
                <h4 className="card-title">Birthday</h4>
                <h4 className="card-title">Gender</h4>
                <h4 className="card-title">Breed</h4>

                <button style={buttonStyle} className="btn">
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="row">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Button
                  </a>
                </div>
              </div>{" "}
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Button
                  </a>
                </div>
              </div>{" "}
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Button
                  </a>
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
