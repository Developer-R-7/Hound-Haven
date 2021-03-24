const mongoose = require("mongoose");
const User = require("../models/userModel");
const Pet = require("../models/pets");
var crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

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

const createUser = async (uname, pw, dn) => {
	const salt = await bcrypt.genSalt();
	const passwordHash = await bcrypt.hash(pw, salt);

	const newUser = new User({
		email: uname,
		password: passwordHash,
		displayName: dn,
		confirmed: true,
	});
	User.collection.insertOne(newUser);
	return newUser;
};

const createPet = async (newUser, pet) => {
	const newPet = new Pet({
		PetName: pet.name,
		BirthDate: pet.bday,
		PetImageLoc: pet.img,
		Gender: pet.gender,
		TypeOfPet: pet.type,
		Breed: pet.breed,
		VetVisits: [
			{
				VisitDate: pet.vdate,
				VisitNotes: pet.vnote,
				Weight: pet.weight,
			},
		],
		Medications: [
			{
				MedicationName: pet.med,
				DueDate: pet.mdate,
				Dose: pet.mdose,
			},
		],
		Reminders: [
			{
				Date: pet.remdate,
				Title: pet.remtitle,
				Note: pet.remnote,
			},
		],
		ParentID: newUser._id,
	});

	Pet.collection.insertOne(newPet);
};

const newUser1 = async () => {
	let email = "seed1@admin.com";
	let password = "password";
	let displayName = "Steve";

	let pet = {};
	pet.name = "Snowball";
	pet.bday = Date.parse("2017-04-05");
	pet.img =
		"https://i.pinimg.com/originals/60/3a/e8/603ae8ce7f600eb1f32631509c6b5a76.jpg";
	pet.gender = "male";
	pet.type = "Bunny";
	pet.breed = "Holland Lop";
	pet.vdate = Date.now();
	pet.vnote = "Was a good buuny";
	pet.med = "Bunny Meds";
	pet.mdate = Date.parse("2021-04-05");
	pet.mdose = "2ml";
	pet.weight = 30;
	pet.remdate = Date.now();
	pet.remtitle = "Buy Hay";
	pet.remnote =
		"Remember the hay for the bunny, she was allergic to the last brand so vet reccommend oat based hay.";

	createUser(email, password, displayName).then((user) => {
		createPet(user, pet);
	});
	return `pet ${email} with ${pet.name} created`;
};

const newUser2 = async () => {
	let email = "seed2@admin.com";
	let password = "password";
	let displayName = "Kim";

	let pet = {};
	pet.name = "Gidget";
	pet.bday = Date.parse("2016-10-05");
	pet.img =
		"https://static.wikia.nocookie.net/secretlifeofpets/images/b/b8/Gidget_pomeranian.png/revision/latest/scale-to-width-down/620?cb=20160903095324";
	pet.gender = "female";
	pet.type = "Dog";
	pet.breed = "Pomeranian";
	pet.vdate = Date.now();
	pet.vnote = "Great visit";
	pet.med = "Dog Meds";
	pet.mdate = Date.parse("2021-05-05");
	pet.mdose = "2ml";
	pet.weight = 35;
	pet.remdate = Date.parse("2021-03-18");
	pet.remtitle = "Remember the pet food";

	createUser(email, password, displayName).then((user) => {
		createPet(user, pet);
	});
	return `pet ${email} with ${pet.name} created`;
};

const newUser3 = async () => {
	let email = "seed3@admin.com";
	let password = "password";
	let displayName = "John";

	let pet = {};
	pet.name = "Chole";
	pet.bday = Date.parse("2020-01-05");
	pet.img =
		"https://static.wikia.nocookie.net/secretlifeofpets/images/f/f2/Chloe.png/revision/latest/scale-to-width-down/620?cb=20160614111511";
	pet.gender = "female";
	pet.type = "cat";
	pet.breed = "Russian blue";
	pet.vdate = Date.now();
	pet.vnote = "Was a good buuny";
	pet.med = "Bunny Meds";
	pet.mdate = Date.parse("2021-04-05");
	pet.mdose = "2ml";
	pet.weight = 15;
	pet.remdate = Date.parse("2021-03-18");
	pet.remtitle = "Remember the pet food";

	let pet2 = {};

	pet2.name = "Norman";
	pet2.bday = Date.parse("2019-05-05");
	pet2.img =
		"https://static.wikia.nocookie.net/secretlifeofpets/images/2/2e/Norman.png/revision/latest/scale-to-width-down/619?cb=20160614145354";
	pet2.gender = "male";
	pet2.type = "Guinea pig";
	pet2.breed = "Short hair";
	pet2.vdate = Date.now();
	pet2.vnote = "Norman is pretty sick needs extra fluids";
	pet2.med = "GP Meds";
	pet2.mdate = Date.parse("2021-04-05");
	pet2.mdose = "2ml";
	pet2.vidate = Date.parse("2021-03-18");
	pet2.viweight = 2.5;
	pet2.remdate = Date.now();
	pet2.remtitle = "Please Remember the pet food";
	createUser(email, password, displayName).then((user) => {
		createPet(user, pet);
		createPet(user, pet2);
	});
	return `pet ${email} with ${pet.name} created`;
};

const closeConn = (data) => {
	console.log(data);
	process.exit(0);
};

const addUsers = async () => {
	try {
		await newUser1();
		await newUser2();
		await newUser3();
		//return cb('some message');
	} catch (err) {
		console.log(err);
		//closeConn();
	}
};

addUsers();

/*
const getSumAsync = (num1, num2, callback) => {
 
  if (!num1 || !num2) {
    return callback(new Error("Missing dependencies"), null);
  }
  
  const sum = num1 + num2;
  const message = `Sum is ${sum}`
  return callback(null, sum, message);
}
const getSumPromise = myPromisify(getSumAsync)
getSumPromise(2, 3).then(arrayOfResults) // [6, 'Sum is 6']
*/
