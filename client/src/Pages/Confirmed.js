import React, {useEffect} from "react";
import {useHistory}from "react-router-dom";
import axios from "axios"

const Confirmed = (props) => {

    useEffect(() => {
       console.log("hello")
    }, [])
  return <div>You are confirmed {props.match.params.token}</div>;
};

export default Confirmed;
