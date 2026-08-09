const mongoose = require('mongoose');
const userSchema= new mongoose.Schema(
    {
        role:{
            type:String,
            enum:["admin", "manager", "programmer"],
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            select:false
        },
    },
    {
        timestamps:true
    }
);
const User = mongoose.model("User", userSchema);
module.exports=User;