const router = require("express").Router();
const auth = require("../middleware/auth");
const { register, login, getUser } = require("../controllers/UserController");

router.post("/register", register);

router.post("/login", login);

router.get("/", auth, getUser);

module.exports = router;
