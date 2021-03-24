import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Tabs, Tab } from "react-bootstrap";

const Notify = (props) => {
	const [notifyItems] = useState(props?.vals);
	const [med] = useState(notifyItems ? notifyItems[0] : null);
	const [vet] = useState(notifyItems ? notifyItems[1] : null);
	const [rem] = useState(notifyItems ? notifyItems[2] : null);

	console.log(vet);
	useEffect(() => {}, [notifyItems]);

	return (
		<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
			<Tab eventKey="meds" title="Medications">
				<ul>
					{med.map((appt) => (
						<li>
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
					{vet.map((appt1) => (
						<li>
							{appt1.Pet} &nbsp;
							<Moment utc format="MM/DD/YYYY">
								{appt1.Date}
							</Moment>
							&nbsp;{appt1.Notes}
						</li>
					))}
				</ul>
			</Tab>
			<Tab eventKey="rems" title="Reminders">
				{rem.map((appt2) => (
					<li>
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
