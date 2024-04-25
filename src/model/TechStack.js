const mongoose = require('mongoose');

const techStack = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    image:{
        type: mongoose.Types.ObjectId,
        ref:'File'
    }

})

const TechStackModel = mongoose.model("TechStack",techStack);
module.exports ={TechStackModel}