const router = require("express").Router();
const auth = require("../middleware/auth");
// this sets up the multer storage that tells the server where to store the file
// the files are named by using the date so the original filenames are not used
const {storage,upload} = require('../middleware/setStorage')
// import the routes from the controllers
const {getImages,saveImage} = require("../controllers/imageController");



router.get("/getImages", auth, getImages);
router.post('/saveImage',auth,upload.single('file'),saveImage);
	

module.exports = router;
