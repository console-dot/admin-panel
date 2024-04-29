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
    whyChoose:[]

})

const MobileDevelopmentModel = mongoose.model("MobileDevelopment",mobileDevelopment);
module.exports ={MobileDevelopmentModel}