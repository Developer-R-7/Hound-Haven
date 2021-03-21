const router = require("express").Router();
const path  = require("path");
const fs = require("fs");
const uuid = require("uuid");
const uuidv1 = uuid.v1
const {storage,multer,bucket} = require('../models/setStorage');
require('dotenv').config();



module.exports = {
    saveImage: async (req,res,next) => {
		console.log(req.file);
		let publicUrl;
		if(!req.file) {
		  res.status(500);
		  return next(err);
		}
        const newFileName = uuidv1() + "." + req.file.originalname;
		const blob = bucket.file(newFileName)
		const blobstream = blob.createWriteStream();
		blobstream.on("error", err => console.log(err) )
		blobstream.on("finish", () => {
		publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`
		})
        blobstream.end(req.file.buffer);
		return res.json({ fileUrl: publicUrl});
	  },
	getImages: async (req, res) => {
		const uploadDirectory = path.join( "client", "public", "images");
	
		fs.readdir(uploadDirectory, (err, files) => {
			if(err) {
				return res.json({msg: err})
			}

			if(files.length === 0){
				return res.json({msg: 'No Images Uploaded'})
			}

			return res.json({files})
		})
	}
	
};