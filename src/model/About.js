const mongoose = require('mongoose');

const about = mongoose.Schema({
    
    description:{
        type: String,
        required: true
    }

})

const AboutModel = mongoose.model("About",about);
module.exports ={AboutModel}