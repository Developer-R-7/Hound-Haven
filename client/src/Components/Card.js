import React from "react";

const Card = function (props)  {
  return <div>

<div className="card text-center w-75">
            <h5 className="card-title"> {props.title}</h5>	
                <div className="card-body">
                    <img src={props.imageUrl} 
                    className="p-3 img-responsive rounded-circle w-10"/>
                    <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                    <p className="card-text">{props.body} </p>
                </div>
            </div>
  </div>;
};

export default Card;
