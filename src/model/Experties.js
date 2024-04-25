const mongoose = require('mongoose');

const expertise = mongoose.Schema({
    image:{
        type: mongoose.Types.ObjectId,
        ref:'File'
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }

})

const ExpertiseModel = mongoose.model("Expertise",expertise);
module.exports ={ExpertiseModel}