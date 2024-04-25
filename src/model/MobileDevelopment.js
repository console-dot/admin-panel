const mongoose = require('mongoose');

const mobileDevelopment = mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    proposition:{
        type:String,
        required:true
    },
    techStack:{
         type:mongoose.Types.ObjectId,
        ref:"TechStack"
    },
    whyChoose:{
         type:mongoose.Types.ObjectId,
        ref:"WhyChoose"
    }

})

const MobileDevelopmentModel = mongoose.model("MobileDevelopment",mobileDevelopment);
module.exports ={MobileDevelopmentModel}