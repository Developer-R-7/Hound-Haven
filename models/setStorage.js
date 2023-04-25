require("dotenv").config();
const Multer = require("multer");




// set up the multer memoery storage limit the filesize to 1M
const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	onError: function (err, next) {
		console.log("error", err);
		return next(err.MulterError);
	},
});


exports.multer = multer;
