const mongoose = require("mongoose");

mongoose.connect(
	process.env.MONGODB_URI || "mongodb+srv://rushi-patel:rushi2003@awstextract.05lv0sc.mongodb.net/myPet?retryWrites=true&w=majority",
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

module.exports = mongoose;
