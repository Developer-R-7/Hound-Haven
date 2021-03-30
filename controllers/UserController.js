require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Confirm = require("../models/confirmModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports = {
	register: async (req, res) => {
		try {
			const { email, password, passwordCheck, displayName } = req.body;

			if (!email || !password || !passwordCheck || !displayName) {
				return res
					.status(400)
					.json({ msg: "Not all fields have been entered" });
			}

			if (passwordCheck.length < 8) {
				return res.status(400).json({ msg: "You need a longer password" });
			}

			if (password !== passwordCheck) {
				return res
					.status(400)
					.json({ msg: "password does not match the password check" });
			}

			const existingUser = await User.findOne({ email: email });

			if (existingUser) {
				return res.status(400).json({ msg: "User already exists" });
			}

			const salt = await bcrypt.genSalt();
			const passwordHash = await bcrypt.hash(password, salt);

			const newUser = new User({
				email,
				password: passwordHash,
				displayName,
			});

			// confirmation with email starts here
			const confirmationToken = new Confirm({
				token: crypto.randomBytes(10).toString("hex"),
				userID: newUser._id,
			});

			console.log(confirmationToken);

			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: "confirmmypet@gmail.com",
					pass: process.env.EPASS,
				},
			});

			const mailOptions = {
				from: "confirmmypet@gmail.com",
				to: newUser.email,
				subject: "Thanks for signing up",
				text: `Email was sent: ${process.env.HEROKU}${confirmationToken.token}`,
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
				} else {
					console.log(
						`Email was sent: ${process.env.HEROKU}${confirmationToken.token}`
					);
				}
			});

			await confirmationToken.save();
			const savedUser = await newUser.save();
			res.json(savedUser);
		} catch (err) {
			res.status(500).json({ msg: err });
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				res.status(400).json({ msg: "all required fields were not sent" });
			}

			const user = await User.findOne({ email: email });

			if (!user) {
				res.status(400).json({ msg: "User doesn't exist" });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				res.status(400).json({ msg: "this was an incorrect password" });
			}

			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "24h",
			});

			res.json({
				token,
				user: {
					id: user._id,
					displayName: user.displayName,
					confirmed: user.confirmed,
				},
			});
		} catch (err) {
			res.status(500).json({ msg: err });
		}
	},

	getUser: async (req, res) => {
		try {
			const user = await User.findById(req.user);

			res.json({
				displayName: user.displayName,
				id: user._id,
			});
		} catch (err) {
			res.send(err.response);
		}
	},

	deleteUser: async (req, res) => {
		try {
			const user = await User.findById({ _id: req.params.id });
			user.remove();
			res.json(user);
		} catch (err) {
			res.send(err.response);
		}
	},
};
