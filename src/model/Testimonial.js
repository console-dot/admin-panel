const mongoose = require('mongoose');

const testimonial = mongoose.Schema({
    image:{
        type: mongoose.Types.ObjectId,
        ref:'File'
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }

})

const TestimonialModel = mongoose.model("Testimonial",testimonial);
module.exports ={TestimonialModel}