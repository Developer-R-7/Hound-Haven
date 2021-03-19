const path  = require("path");
const fs = require("fs");
const multer  = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './client/public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
const upload = multer({storage: storage});

exports.storage = storage;
exports.upload = upload;