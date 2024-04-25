const mongoose = require('mongoose');

const arVrService = mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    whyChoose:{
        type: mongoose.Types.ObjectId,
        ref:'WhyChoose'
    },
    techStack:{
        type: mongoose.Types.ObjectId,
        ref:'TechStack'
    }

})

const ArVrServiceModel = mongoose.model("ArVrService",arVrService);
module.exports ={ArVrServiceModel}