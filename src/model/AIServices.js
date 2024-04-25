const mongoose = require('mongoose');

const artificialIntelligence = mongoose.Schema({
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

const ArtificialIntelligenceModel = mongoose.model("ArtificialIntelligence",artificialIntelligence);
module.exports ={ArtificialIntelligenceModel}