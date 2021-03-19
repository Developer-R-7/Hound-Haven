const router = require("express").Router();
const path  = require("path");
const fs = require("fs");


module.exports = {
    saveImage: async (req,res,next) => {
		if(!req.file) {
		  res.status(500);
		  return next(err);
		}
		res.json({ fileUrl: '/images/' + req.file.filename });
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
