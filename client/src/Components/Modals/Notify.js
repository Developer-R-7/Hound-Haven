import React, {useState,useEffect,useContext} from 'react'
import moment from 'moment';
import PetContext from "../../Context/PetContext";

const Notify = (props) => {
	console.log(props)
	const { appt, setAppt } = useContext(PetContext);
	const { pets } = useContext(PetContext);

			

	  useEffect(() => {	
			// pets.length >0 && pets.forEach((pet) => {
			// 		marr =[];
			// 		varr =[];
			// 		rarr = [];
			// 		//setPetAppointments
			// 		let PetName = pet.PetName;
			// 		let meds = pet.Medications.filter(((appt) => {
			// 		return ( moment.utc(appt.DueDate).isBetween(today, tomorrow, undefined, '[]'));
			// 		}));
			// 		let visits = pet.VetVisits.filter(((appt) => {
			// 			return ( moment.utc(appt.VisitDate).isBetween(today, tomorrow, undefined, '[]'));
			// 			}));
			// 		let remind = pet.Reminders.filter(((appt) => {
			// 		return ( moment.utc(appt.Date).isBetween(today, tomorrow, undefined, '[]'));
			// 		}));
			// 		if (meds.length > 0 ) {
			// 		meds.forEach(el => {
			// 			let arr=[];
			// 			arr[PetName] = {'Date': moment.utc(el.DueDate).format('YYYY-MM-DD'),
			// 		'MedicationName': el.MedicationName,
			// 		'Dose': el.Dose}
			// 		marr.push(arr)
			// 		});
			// 		}
			// 		if (visits.length > 0 ) {
			// 		visits.forEach(el => {
			// 			let arr=[];
			// 			arr[PetName] = {'Date': moment.utc(el.VisitDate).format('YYYY-MM-DD'),
			// 		'Notes': el.VisitNotes}
			// 		varr.push(arr)
			// 		});
			// 		}
			// 		if (remind.length > 0 ) {
			// 		remind.forEach(el => {
			// 			let arr=[];
			// 			arr[PetName] = {'Date': moment.utc(el.Date).format('YYYY-MM-DD'),
			// 		'Title': el.Title,
			// 		'Note': el.Note}
			// 		rarr.push(arr)
			// 		});
			// 		}
			// 	})
			// 	setAppt(marr.length + varr.length + rarr.length)
		
	}, [pets])



	return (

						<div>
							<ul className="nav nav-tabs" id="myTab" role="tablist">
								<li className="nav-item" role="presentation">
									<button
										className="nav-link active"
										id="home-tab"
										data-bs-toggle="tab"
										data-bs-target="#home"
										type="button"
										role="tab"
										aria-controls="home"
										aria-selected="true"
									>
										Medications
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link"
										id="profile-tab"
										data-bs-toggle="tab"
										data-bs-target="#profile"
										type="button"
										role="tab"
										aria-controls="profile"
										aria-selected="false"
									>
										Visits
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link"
										id="contact-tab"
										data-bs-toggle="tab"
										data-bs-target="#contact"
										type="button"
										role="tab"
										aria-controls="contact"
										aria-selected="false"
									>
										Reminders
									</button>
								</li>
							</ul>
							<div className="tab-content" id="myTabContent">
								<div
									className="tab-pane fade show active"
									id="home"
									role="tabpanel"
									aria-labelledby="home-tab"
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Similique, fugiat.
								</div>
								<div
									className="tab-pane fade"
									id="profile"
									role="tabpanel"
									aria-labelledby="profile-tab"
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
									dolorem.
								</div>
								<div
									className="tab-pane fade"
									id="contact"
									role="tabpanel"
									aria-labelledby="contact-tab"
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Fugiat, explicabo.
								</div>
							</div>
						</div>
					
	);
};

export default Notify;
