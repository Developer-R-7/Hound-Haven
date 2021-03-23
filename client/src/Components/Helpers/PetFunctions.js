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

	const getPetAppointment = (pets) => {
		let today = new Date();
		today.setDate(today.getDate() - 1);
		let tomorrow = new Date();
		tomorrow.setDate(today.getDate() + 2);
		
		let marr =[];
		let varr =[];
		let rarr = [];
		pets.length >0 && pets.forEach((pet) => {
			//setPetAppointments
			let PetName = pet.PetName;
			let meds = pet.Medications.filter(((appt) => {
			return ( moment.utc(appt.DueDate).isBetween(today, tomorrow, undefined, '[]'));
			}));
			let visits = pet.VetVisits.filter(((appt) => {
				return ( moment.utc(appt.VisitDate).isBetween(today, tomorrow, undefined, '[]'));
				}));
			let remind = pet.Reminders.filter(((appt) => {
			return ( moment.utc(appt.Date).isBetween(today, tomorrow, undefined, '[]'));
			}));
			if (meds.length > 0 ) {
			meds.forEach(el => {
				let arr=[];
				arr[PetName] = {'Date': moment.utc(el.DueDate).format('YYYY-MM-DD'),
			'MedicationName': el.MedicationName,
			'Dose': el.Dose}
			marr.push(arr)
			});
			}
			if (visits.length > 0 ) {
			visits.forEach(el => {
				let arr=[];
				arr[PetName] = {'Date': moment.utc(el.VisitDate).format('YYYY-MM-DD'),
			'Notes': el.VisitNotes}
			varr.push(arr)
			});
			}
			if (remind.length > 0 ) {
			remind.forEach(el => {
				let arr=[];
				arr[PetName] = {'Date': moment.utc(el.Date).format('YYYY-MM-DD'),
			'Title': el.Title,
			'Note': el.Note}
			rarr.push(arr)
			});
			}
		})
		let numAppt = (marr.length + varr.length + rarr.length)
        return ([numAppt,marr,varr,rarr]);

	}


	const useEffectOnlyOnce = (func) => useEffect(func, [])


export{ getPetData, loadUserPets, resizeFile, useEffectOnlyOnce, getPetAppointment}