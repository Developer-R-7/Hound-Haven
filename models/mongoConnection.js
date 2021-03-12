const mongoose = require("mongoose");



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
)

module.exports = mongoose;