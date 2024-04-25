const mongoose = require('mongoose');

const blockChainDS = mongoose.Schema({
    description:{
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

const BlockChainDSModel = mongoose.model("BlockChainDS",blockChainDS);
module.exports ={BlockChainDSModel}