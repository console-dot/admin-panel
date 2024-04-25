const mongoose = require('mongoose');

const offshoreType = mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    advantages:[],
    comparison :[]

})

const OffshoreTypeModel = mongoose.model("OffshoreType",offshoreType);
module.exports ={OffshoreTypeModel}