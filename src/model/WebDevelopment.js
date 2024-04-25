const mongoose = require('mongoose');

const webDevelopment = mongoose.Schema({
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

const WebDevelopmentModel = mongoose.model("WebDevelopment",webDevelopment);
module.exports ={WebDevelopmentModel}