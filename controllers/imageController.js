const router = require("express").Router();
const path  = require("path");
const fs = require("fs");

const crypto = require("crypto");

const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");


// DB
const mongoURI = 	process.env.MONGODB_URI || "mongodb://localhost/myPet";

// connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
});

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"  //name of collaction hat will be created
  });
});



// Storage  create the storage
const storage = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
	  return new Promise((resolve, reject) => {
		crypto.randomBytes(16, (err, buf) => {
		  if (err) {
			return reject(err);
		  }
		  const filename = buf.toString("hex") + path.extname(file.originalname);
		  const fileInfo = {
			filename: filename,
			bucketName: "uploads"
		  };
		  resolve(fileInfo);
		});
	  });
	}
  });
  
  const upload = multer({
	storage
  });
  
  
  exports.storage = storage;
  exports.upload = upload;


module.exports = {
    saveImage: async (req, res) => {
		//console.log(req.file.filename);
		res.json(req.file.filename);
	  },
	getImage: (req, res) => {
		console.log(req.params)
		const file = gfs
		  .findOne({
			filename: req.params.filename
		  })
		  .toArray((err, files) => {
			if (!files || files.length === 0) {
			  return res.status(404).json({
				err: "no files exist"
			  });
			}
			gfs.openDownloadStream(req.params.filename).pipe(res);
		  });
	  }
	
};
