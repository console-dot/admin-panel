const mongoose = require('mongoose');

const intro = mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    heroDescription:{
        type: String,
        required: true
    },
    footerDescription:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    socialLinks:{
        type: String,
        required: true
    },
    workExperience:{
        countries:{
            type: String
        },
        expEmployees:{
            type: String
        },
        scrumTeams:{
            type: String
        },
        fullStackDev:{
            type: String
        },
    }

})

const IntroModel = mongoose.model("Intro",intro);
module.exports ={IntroModel}