const mongoose = require('mongoose');

const openPosition = mongoose.Schema({
    jobType:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    noOfPositions:{
        type: String,
        required: true
    },
    qualifications:{
        type: String,
        required: true
    },
    employmentType:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    noOfRequest:{
        type: String,
        required: true
    },
    capacity:{
        type: String,
        required: true
    }
    

})

const OpenPositionModel = mongoose.model("OpenPosition",openPosition);
module.exports ={OpenPositionModel}