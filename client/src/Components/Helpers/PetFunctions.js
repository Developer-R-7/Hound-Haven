//Function to get the petdata 
import axios from 'axios';

async function getPetData(petid) {
   let data,id;
    try {
      const { data } = await axios.get(
        `/api/pet/${petid}`,
        { headers: { "x-auth-token": localStorage.getItem("auth-token") } }
      );
      console.log(id);
    } catch (error) {
      console.log(error);
    }

    return (data); 

  }  

export{ getPetData }