const Pets = require("../models/pets");

module.exports = {
  getPets: async (req, res) => {
    //verified code works
    Pets.find({})
      .then((dbPets) => res.json(dbPets))
      .catch((err) => res.status(400).json(err));
  },
  getPetsByUser: async (req, res) => {
    //verified code works
    Pets.find({
      ParentID: req.params.id,
    })
      .then((dbPets) => res.json(dbPets))
      .catch((err) => res.status(400).json(err));
  },
  delPet: async (req, res) => {
    Pets.findById({ _id: req.params.id })
      .then((dbPets) => dbPets.remove())
      .then((dbPets) => res.json(dbPets))
      .catch((err) => res.status(422).json(err));
  },
  updatePet: async (req, res) => {
    Pets.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  getPetByID: async (req, res) => {
    Pets.findById(req.params.id)
      .then((dbPets) => res.json(dbPets))
      .catch((err) => res.status(422).json(err));
  },
  createPet: (req, res) => {
    Pets.create(req.body)
      .then((dbPets) => {
        res.json(dbPets);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  addPetMed: (req, res) => {
    let pet_id = req.params.id;
    console.log("body",req)
    pet_id.trim(); //make sure no spaces
    //findOneAndUpdate(filter, update, options)
    Pets.findOneAndUpdate(
        {_id: pet_id}, // filter
        {
            $push: {
                Medications: req.body
        }},//update
        {new: true}//options
    )
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
      }       
};
