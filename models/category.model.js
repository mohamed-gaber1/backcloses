const mongoose= require('mongoose')

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    image: {
        url: {
            type: String,
            default: null
        },
        publicId: {
            type: String,
            default: null
        }
    }
},{
    timestamps:true
})
const Category=mongoose.model("Category",categorySchema)
module.exports=Category