const mongoose = require('mongoose');

const user = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    }

})

const UserModel = mongoose.model("User",user);
module.exports ={UserModel}