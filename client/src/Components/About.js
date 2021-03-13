import React from 'react'

const About = () => {
    return (
        <div className="col-md-5  m-4">
            <div className="card text-center w-75">
            <h5 className="card-title">The My Pet App</h5>	
                <div className="card-body">
                    <img src="http://placekitten.com/g/200/300" alt="Pet" 
                    className="p-3 img-responsive rounded-circle w-10"/>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">Application to track your pet's health and help you 
                    track when it's time for vaccinations and give meds. </p>
                </div>
            </div>
        </div>
    )
}

export default About
