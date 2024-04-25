const mongoose = require('mongoose');

const whyChoose = mongoose.Schema({
    description:[],
})

const WhyChooseModel = mongoose.model("WhyChoose" , whyChoose);
module.exports ={WhyChooseModel}