const mongoose = require("mongoose");
const Pets = require("./pets");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, "Enter a valid email"],
	},
	password: { type: String, required: true, minLength: 5 },
	displayName: { type: String, required: true },
	confirmed: { type: Boolean, default: false },
});

userSchema.pre("remove", async function (next) {
	try {
		await Pets.deleteMany({
			ParentID: {
				$in: this._id,
			},
		});
		next();
	} catch (err) {
		next(err);
	}
});

module.exports = User = mongoose.model("user", userSchema);
