import React from "react";
import logo from "./paw_logo.PNG";

const About = () => {
    // const size = {
    //     height: "450px",
    //     width: "450px",
    // };
    return (
        <div className="col-md-5  m-4">
            <div className="card text-center w-75">
                <h5 className="card-title">The My Pet App</h5>
                <div className="card-body">
                    <img
                        src={logo}
                        alt="petLogo"
                      
                        className="p-3 img-fluid rounded-circle w-10"
                    ></img>

                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">
                        Application to track your pet's health and help you track when it's
            time for vaccinations and give meds.{" "}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
