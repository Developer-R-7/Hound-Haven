const router = require("express").Router();
const path  = require("path");
const fs = require("fs");
const uuid = require("uuid");
const uuidv1 = uuid.v1
const {storage,multer,bucket} = require('../models/setStorage');
require('dotenv').config();



module.exports = {
    saveImage: async (req,res,next) => {
		let publicUrl;
		try{
		console.log(req.file);
		if(!req.file) {
		  res.status(500);
		  return next(err);
		}



		const originalFileName = req.file.originalname.replace(/(?!\w|\s)/g, '').replace(/\s+/g, '_');

        const newFileName = uuidv1() + "." + originalFileName
		const blob = bucket.file(newFileName)
		const blobstream = blob.createWriteStream();
		blobstream.on("error", err => console.log(err) )
		blobstream.on("finish", () => {
		publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`
		return next(res.json({"imageurl": publicUrl}));
		})
        blobstream.end(req.file.buffer);
		//eturn next(res.json({ fileUrl: publicUrl}));
		} catch (err) { return res.json({Error: err.message})}
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