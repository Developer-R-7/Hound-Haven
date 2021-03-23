//Function to get the petdata 

import axios from "axios";
import Resize from "react-image-file-resizer";
import{useEffect} from "react";
import moment from "moment";



async function getPetData(petid) {

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
		let url = `/api/getpetbyuser/${user}`;
		try {
			const { data } = await axios.get(url, {
				headers: { "x-auth-token": localStorage.getItem("auth-token") },
			});
			return (data); 
		} catch (error) {
			console.log(error);
		}

	};

	const resizeFile = async(file) => {
		let newImage;
		try {
			newImage = Resize.imageFileResizer(file, 400, 400, 'JPEG', 70, 0,
			uri => {
				newImage = uri;
				return newImage;
			},
			'base64'
			);
		return newImage;
		} catch (error) {console.log(error)} ;
		
	};

	

	const useEffectOnlyOnce = (func) => useEffect(func, [])


export{ getPetData, loadUserPets, resizeFile, useEffectOnlyOnce}