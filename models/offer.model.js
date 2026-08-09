const mongoose = require('mongoose')

const offerSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        description: {
            type: String,
            trim: true,
        },
        discount: {
            type: String,
            trim:true,
        },
        startDate:{
            type:Date
        },
        endDate:{
            type:Date
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
const Offer=mongoose.model("Offer",offerSchema)
module.exports=Offer