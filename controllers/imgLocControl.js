const router = require("express").Router();
const path = require("path");
const fs = require("fs");

module.exports = {
	saveLocImage: async (req, res, next) => {
		try {
			if (!req.file) {
				res.status(500);
				return next(err);
			}
			res.send({ fileUrl: "./images/" + req.file.filename });
		} catch (err) {
			(err) => res.send({ msg: err });
		}
	},
	getLocImages: async (req, res) => {
		const uploadDirectory = path.join("client", "public", "images");

		fs.readdir(uploadDirectory, (err, files) => {
			if (err) {
				return res.json({ msg: err });
			}

			if (files.length === 0) {
				return res.json({ msg: "No Images Uploaded" });
			}

			return res.json({ files });
		});
	},
};
