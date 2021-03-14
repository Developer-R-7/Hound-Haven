const mongoose = require("mongoose");
const User = require("../models/userModel");
const Pet = require("../models/pets");

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/myPet",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true,
	},
	(err) => {
		if (err) throw err;
		console.log("MongoDB connection established");
	}
);

const newUser1 = new User({
	email: "seed1@admin.com",
	password: "password",
	displayName: "Steve",
	confirmed: true,
});

const newUser2 = new User({
	email: "seed2@admin.com",
	password: "password",
	displayName: "Kim",
	confirmed: true,
});

const newUser3 = new User({
	email: "seed3@admin.com",
	password: "password",
	displayName: "John",
	confirmed: true,
});

const newPet1 = new Pet({
	PetName: "Snowball",
	BirthDate: Date.now(),
	PetImageLoc:
		"https://i.pinimg.com/originals/60/3a/e8/603ae8ce7f600eb1f32631509c6b5a76.jpg",
	Gender: "male",
	TypeOfPet: "Bunny",
	Breed: "Holland Lop",
	VetVisits: [
		{
			VisitDate: Date.now(),
		},
		{
			VisitNotes: "Was a good buuny",
		},
	],
	Medications: [
		{
			MedicationName: "Bunny Meds",
		},
		{
			DueDate: Date.parse("2021-04-05"),
		},
		{
			Dose: "",
		},
	],
	Vitals: [
		{
			Date: Date.now(),
		},
		{
			Weight: 30,
		},
	],
	ParentID: newUser1._id,
});

const newPet2 = new Pet({
	PetName: "Gidget",
	BirthDate: Date.now(),
	PetImageLoc:
		"https://static.wikia.nocookie.net/secretlifeofpets/images/b/b8/Gidget_pomeranian.png/revision/latest/scale-to-width-down/620?cb=20160903095324",
	Gender: "female",
	TypeOfPet: "Dog",
	Breed: "Pomeranian",
	VetVisits: [
		{
			VisitDate: Date.now(),
		},
		{
			VisitNotes: "Great visit",
		},
	],
	Medications: [
		{
			MedicationName: "Dog Meds",
		},
		{
			DueDate: Date.parse("2021-04-05"),
		},
		{
			Dose: "2 per week",
		},
	],
	Vitals: [
		{
			Date: Date.now(),
		},
		{
			Weight: 35,
		},
	],
	ParentID: newUser2._id,
});

const newPet3 = new Pet({
	PetName: "Chloe",
	BirthDate: Date.now(),
	PetImageLoc:
		"https://static.wikia.nocookie.net/secretlifeofpets/images/f/f2/Chloe.png/revision/latest/scale-to-width-down/620?cb=20160614111511",
	Gender: "female",
	TypeOfPet: "Cat",
	Breed: "Russian blue",
	VetVisits: [
		{
			VisitDate: Date.now(),
		},
		{
			VisitNotes: "Great visit",
		},
	],
	Medications: [
		{
			MedicationName: "Cat Meds",
		},
		{
			DueDate: Date.parse("2021-04-05"),
		},
		{
			Dose: "",
		},
	],
	Vitals: [
		{
			Date: Date.now(),
		},
		{
			Weight: 33,
		},
	],
	ParentID: newUser3._id,
});

const newPet4 = new Pet({
	PetName: "Norman",
	BirthDate: Date.now(),
	PetImageLoc:
		"https://static.wikia.nocookie.net/secretlifeofpets/images/2/2e/Norman.png/revision/latest/scale-to-width-down/619?cb=20160614145354",
	Gender: "male",
	TypeOfPet: "Guinea pig",
	Breed: "Short hair",
	VetVisits: [
		{
			VisitDate: Date.now(),
		},
		{
			VisitNotes: "Good Visit",
		},
	],
	Medications: [
		{
			MedicationName: "Guinea pig Meds",
		},
		{
			DueDate: Date.parse("2021-04-05"),
		},
		{
			Dose: "",
		},
	],
	Vitals: [
		{
			Date: Date.now(),
		},
		{
			Weight: 20,
		},
	],
	ParentID: newUser2._id,
});

User.deleteMany({})
	.then(() => User.collection.insertOne(newUser1))
	.then(() => User.collection.insertOne(newUser2))
	.then(() => User.collection.insertOne(newUser3))
	.then((data) => {
		console.log(data.result.n + " records inserted!");
	})
	.catch((err) => {
		console.error(err);
	});

Pet.deleteMany({})
	.then(() => Pet.collection.insertOne(newPet1))
	.then(() => Pet.collection.insertOne(newPet2))
	.then(() => Pet.collection.insertOne(newPet3))
	.then(() => Pet.collection.insertOne(newPet4))
	.then((data) => {
		console.log(data.result.n + " records inserted!");
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
