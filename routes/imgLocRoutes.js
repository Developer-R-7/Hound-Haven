const router = require("express").Router();
const auth = require("../middleware/auth");
// this sets up the multer storage that tells the server where to store the file
// the files are named by using the date so the original filenames are not used
const { storage, upload } = require("../models/setLocStorage");
// import the routes from the controllers
const { getLocImages, saveLocImage } = require("../controllers/imgLocControl");

router.get("/getLocImages", auth, getLocImages);
router.post("/saveLocImage", auth, upload.single("file"), saveLocImage);

module.exports = router;
