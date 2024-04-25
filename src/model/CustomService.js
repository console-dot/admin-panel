const mongoose = require('mongoose');

const customService = mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    proposition:{
        type:String,
        required:true
    },
    whyChooseDesc:{
        type:String,
        required:true
    },
    whyChoose:{
        type:mongoose.Types.ObjectId,
        ref:'WhyChoose'
    },
    delivers:{
        actionDescription:{
            type:String,
            required:true
        },
        collabDescription:{
            type:String,
            required:true
        }
    }

})

const CustomServiceModel = mongoose.model("CustomService",customService);
module.exports ={CustomServiceModel}