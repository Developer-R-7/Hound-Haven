import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Tabs, Tab } from "react-bootstrap";

const Notify = (props) => {
  const [notifyItems] = useState(props?.vals);

  const [med] = useState(notifyItems ? notifyItems[0] : null);
  const [vet] = useState(notifyItems ? notifyItems[1] : null);
  const [rem] = useState(notifyItems ? notifyItems[2] : null);
  const [defActKey, setDefActKey] = useState("meds");


	// lazy logic if all three meds will be open as it is the last set


  useEffect(() => {
    setActTab();
  }, [notifyItems, setActTab]);

	useEffect(() => {
		const setActTab = ()  => {
			rem.length > 0 && setDefActKey('rems');
			med.length > 0 && setDefActKey('meds');
			vet.length > 0 && setDefActKey('vets');
		}	
		setActTab()
	}, [notifyItems,med,vet,rem]);

	return (
		<Tabs defaultActiveKey={defActKey} id="uncontrolled-tab-example">
			{med.length > 0 && <Tab eventKey="meds" title="Medications">
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
			</Tab>}
			{vet.length > 0 && <Tab eventKey="vets" title="Vet Visits">
				<ul>
					{vet.map((appt) => (
						<li>
							{appt.Pet} &nbsp;
							<Moment utc format="MM/DD/YYYY">
								{appt.Date}
							</Moment>
							&nbsp;{appt.Notes}
						</li>
					))}
				</ul>
			</Tab> }
			{rem.length > 0 && <Tab eventKey="rems" title="Reminders">
				{rem.map((appt) => (
					<li>
						{appt.Pet} &nbsp;
						<Moment utc format="MM/DD/YYYY">
							{appt.Date}
						</Moment>
						&nbsp; {appt.Title}&nbsp;
						{appt.Notes}
					</li>
				))}
			</Tab> }
		</Tabs>
	);

};

export default Notify;
