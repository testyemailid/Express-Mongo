const mongoose = require("mongoose");

const signup_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    }
});

module.exports = mongoose.model('signup_schema',signup_schema);

