const router = require("express").Router();
const auth = require("../middleware/auth");
const { getPets, getPetsByUser, updatePet, delPet, createPet, getPetByID } = require("../controllers/PetController");

router.get('/getpets', auth, getPets);
router.get('/getpetbyuser/:id', auth, getPetsByUser);
router.put('/updatepet/:id', auth, updatePet);
router.delete('/pet/:id',auth, delPet);
router.post('/pet', auth, createPet);
router.get('/pet/:id',auth, getPetByID);

module.exports = router;

