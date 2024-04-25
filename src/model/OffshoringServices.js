const mongoose = require('mongoose');

const offshoringServices = mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    offshoreType:{
        type:mongoose.Types.ObjectId,
        ref:'OffshoreType'
    }

})

const OffshoringServicesModel = mongoose.model("OffshoringService",offshoringServices);
module.exports ={OffshoringServicesModel}