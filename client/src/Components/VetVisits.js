import React from 'react'

    const VetVists = (props) => {
    console.log(props);


    const buttonStyle = {
        backgroundColor: "rgb(255, 100, 100)",
    };
    
    return (
        <div className="card m-2">
            <div className="card-body">
            <h2 className="card-title">Vet Visits</h2>
                <button
                    style={buttonStyle}
                    className=" btn btn-circle btn-xl">
                        Edit
                </button>
            </div>
        </div>

    )
}

export default VetVists
