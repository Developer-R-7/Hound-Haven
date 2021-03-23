import React, {useState,useEffect,useContext} from 'react'
import moment from 'moment';
import {useEffectOnlyOnce } from '../Helpers/PetFunctions'
import PetContext from "../../Context/PetContext";


const UpcomingAppointments = (props) => {

  const pets = props.pets;
  const [medAppt, setMedAppt] = useState([]);
  const [vetAppt, setVetAppt] = useState([]);
  const [remAppt, setRemAppt] = useState([]);
  const { appt, setAppt } = useContext(PetContext);

  useEffect(() => {
    newCalendar();
  }, [pets])


const newCalendar = async () => {
    let marr =[];
    let varr =[];
    let rarr = [];
    let today = new Date();
    today.setDate(today.getDate() - 1);
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 2);
    pets.forEach((pet) => {
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
  setMedAppt(marr);
  setVetAppt(varr);
  setRemAppt(rarr);
  setAppt(marr.length + varr.length + rarr.length)
console.log(medAppt,vetAppt,remAppt); 
}

  useEffectOnlyOnce (newCalendar) 


    return (
        <div>
            
        </div>
    )
}


export default UpcomingAppointments






