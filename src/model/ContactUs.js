const mongoose = require('mongoose');


const contactUs= mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    companyName:{
        type:String
    },
    preferredContactMethod:{
        type:String
    },
    message:{
        type:String,
        required:true
    }
})

const ContactUsModel = mongoose.model("ContactUs", contactUs);
module.exports={ContactUsModel}