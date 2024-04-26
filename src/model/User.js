const mongoose = require('mongoose');

const user = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type: mongoose.Types.ObjectId,
        ref:'WhyChoose'
    },
    userName:{
        type: mongoose.Types.ObjectId,
        ref:'TechStack'
    }

})

const UserModel = mongoose.model("User",user);
module.exports ={UserModel}