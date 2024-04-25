const mongoose = require('mongoose');

const testimonial = mongoose.Schema({
    image:{
        type: mongoose.Types.ObjectId,
        ref:'File'
    },
    fullName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    }

})

const TestimonialModel = mongoose.model("Testimonial",testimonial);
module.exports ={TestimonialModel}