const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
        PetName: {
            type: String
        },
        BirthDate: {
            type: Date
        },
        Parent: {
            type: String
        },
        Gender: {
            type: String
        },
        TypeOfPet: {
            type: String
        },
        VetVisits: [{
                VisitDate: {
                    type: Date
                },
                VisitNotes: {
                    type: String
                }
        }],
        Medications: [{
                    MedicationName: {
                        type: String,
                    },
                    DueDate: {
                        type: Date
                    },
                   Dose: {
                        type: String
                    }
        }],
        Vitals: [{

            Date: {
                    type: Date
                },
            Weight: {
                    type: Number
                }
            }],
        ParentID: {
            type: String
        }
    
})

module.exports = Pet = mongoose.model("pet", petSchema);
