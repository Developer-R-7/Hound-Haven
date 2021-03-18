//Function to get the petdata 
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Route, Link } from "react-router-dom";

async function getPetData(petid) {
   let data;
    try {
      const { data } = await axios.get(
        `/api/pet/${petid}`,
        { headers: { "x-auth-token": localStorage.getItem("auth-token") } }
      );
      return (data);
    } catch (error) {
      console.log(error);
    }
 

  }  

	const loadUserPets = async (user) => {
    let data;
		console.log(user);
		let url = `/api/getpetbyuser/${user}`;
		let token = localStorage.getItem("auth-token");
		console.log(url);
		console.log(token);
		try {
			const { data } = await axios.get(url, {
				headers: { "x-auth-token": localStorage.getItem("auth-token") },
			});
		} catch (error) {
			console.log(error);
		}
    return (data); 
	};

export{ getPetData, loadUserPets }