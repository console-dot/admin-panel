const mongoose = require('mongoose');

const faq = mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    }

})

const FAQModel = mongoose.model("FAQ",faq);
module.exports ={FAQModel}