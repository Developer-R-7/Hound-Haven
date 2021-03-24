import React, {useState,useEffect,useReducer} from 'react'
import Moment from 'react-moment'
import {Tabs, Tab, Button } from "react-bootstrap";




const Notify = (props) => {
    const [notifyItems, setNotifyItems] = useState(props?.vals)
	const [key, setKey] = useState('meds');
	const [med, setMed] = useState(notifyItems?notifyItems[0]:null);
	const [vet, setVet] = useState(notifyItems?notifyItems[1]:null);
	const [rem, setRem] = useState(notifyItems?notifyItems[2]:null);

	console.log(med);
		useEffect(() => {
			console.log(med);
		}, [notifyItems])
	


	return (


		<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
		<Tab eventKey="meds" title="Medications">
			<ul>
				
					{ med.map((appt) =>( 
					
				<li >
					
					{appt.Pet} &nbsp; 
					<Moment utc format="MM/DD/YYYY">
						{appt.Date}
					</Moment>	
					&nbsp; {appt.Medication}&nbsp; 
					{appt.Dose}
					</li>
				))}

			</ul>
				
			
		</Tab>
		<Tab eventKey="vets" title="Vet Visits">
		<ul>
		  { vet.map((appt1) =>( 	
			<li >
				{appt1.Pet} &nbsp; 
				<Moment utc format="MM/DD/YYYY">
					{appt1.Date}
				</Moment>	
				&nbsp;{appt1.Notes}
				</li>
			))}

		</ul>
		</Tab>
		<Tab eventKey="rems" title="Reminders" disabled>
		{ rem.map((appt2) =>( 	
			<li >
				{appt2.Pet} &nbsp; 
				<Moment utc format="MM/DD/YYYY">
					{appt2.Date}
				</Moment>	
				&nbsp; {appt2.Title}&nbsp; 
				{appt2.Notes}
				</li>
			))}

		 
		</Tab>
	  </Tabs>


	);
	};

export default Notify;
