import moment from "moment";

const HandleAppoint = (pets, called) => {
	let today = new Date();
	today.setDate(today.getDate() - 1);
	let tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 2);
	let med = [];
	let visit = [];
	let remind = [];

	//function uses flatmap to extract the keys from the pets - if it contains a DueDate, VisitDate or Date put whereit needs to be
	const getKeys = (obj) =>
		Object.keys(obj).flatMap((k) =>
			Object(obj[k]) === obj[k] ? [k, ...getKeys(obj[k])] : k
		);

	//funtion to filter out all recent appointments
	if (pets.length > 0) {
		pets.forEach((pet) => {
			let m1 = getKeys(pet);
			if (m1.find((el) => el === "DueDate")) {
				pet.Medications.forEach((meq) => {
					if (moment(meq.DueDate).isBetween(today, tomorrow, undefined, "[]")) {
						med.push({
							Pet: pet.PetName,
							Date: meq.DueDate,
							Medication: meq.MedicationName,
							Dose: meq.Dose,
						});
					}
				});
			}

			let v1 = getKeys(pet);
			if (v1.find((el) => el === "VisitDate")) {
				pet.VetVisits.forEach((viq) => {
					if (
						moment(viq.VisitDate).isBetween(today, tomorrow, undefined, "[]")
					) {
						visit.push({
							Pet: pet.PetName,
							Date: viq.VisitDate,
							Notes: viq.VisitNotes,
							Weight: viq.Weight,
						});
					}
				});
			}

			let r1 = getKeys(pet);
			if (r1.find((el) => el === "Date")) {
				pet.Reminders.forEach((req) => {
					if (moment(req.Date).isBetween(today, tomorrow, undefined, "[]")) {
						remind.push({
							Pet: pet.PetName,
							Date: req.Date,
							Title: req.Title,
							Notes: req.Note,
						});
					}
				});
			}
		});
	}

	if (called === "nav") return med.length + visit.length + remind.length;
	if (called === "notify") return [med, visit, remind];
};

export default HandleAppoint;
