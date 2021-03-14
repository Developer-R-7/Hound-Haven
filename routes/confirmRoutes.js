const router = require("express").Router();
const { confirmUser } = require("../controllers/ConfirmController");

router.post("/", confirmUser);
module.exports = router;
