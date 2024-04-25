const mongoose = require('mongoose');

const uiUxService = mongoose.Schema({
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

const UiUxServiceModel = mongoose.model("UiUxService",uiUxService);
module.exports ={UiUxServiceModel}