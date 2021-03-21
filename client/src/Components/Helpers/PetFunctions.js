//Function to get the petdata 

import axios from "axios";
import Compress from "react-image-file-resizer";



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

		console.log(user);
		let url = `/api/getpetbyuser/${user}`;
		let token = localStorage.getItem("auth-token");
		console.log(url);
		console.log(token);
		try {
			const { data } = await axios.get(url, {
				headers: { "x-auth-token": localStorage.getItem("auth-token") },
			});
			return (data); 
		} catch (error) {
			console.log(error);
		}

	};

	const resizeFile = (file) => {new Promise(resolve => {
		Compress.imageFileResizer(file, 400, 400, 'JPEG', 70, 0,
		uri => {
		  resolve(uri);
		},
		'base64'
		);
	});
}

export{ getPetData, loadUserPets, resizeFile }