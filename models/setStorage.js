const crypto = require("crypto");
const path = require("path");
require('dotenv').config();
const Multer = require("multer");
const {Storage} = require('@google-cloud/storage');






// Storage  create the storage
const storage = new Storage({
  projectId: process.env.GCS_PROJECT,
  credentials:{
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY
  }
})

// set up the multer memoery storage limit the filesize to 1M
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 *1024
  }
});

const bucket = storage.bucket(process.env.GCS_BUCKET);


exports.storage = storage;
exports.multer = multer;
exports.bucket = bucket;