const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
	PetName: {
		type: String,
		required: true,
	},
	BirthDate: {
		type: Date,
	},
	PetImageLoc: {
		type: String,
	},
	Gender: {
		type: String,
	},
	TypeOfPet: {
		type: String,
		required: true,
	},
	Breed: {
		type: String,
	},
	VetVisits: [
		{
			VisitDate: {
				type: Date,
			},
			VisitNotes: {
				type: String,
			},
			Weight: {
				type: Number,
			}
		},
	],
	Medications: [
		{
			MedicationName: {
				type: String,
			},
			DueDate: {
				type: Date,
				default: Date.now
			},
			Dose: {
				type: String,
			},
		},
	],
	Reminders: [
		{
			Date: {
				type: Date,
			},
			Title: {
				type: String,
			},
			Note: {
				type: String,
			}
		},
	],
	ParentID: {
		type: String,
		required: true,
	},
});

module.exports = Pet = mongoose.model("pet", petSchema);
