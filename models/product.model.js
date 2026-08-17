const mongoose= require('mongoose')

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    branches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    }],
    images: [
        {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        }
    ],
    colors:[{
        type:String
    }],
    sizes:[{
        type:String
    }],
    featured:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
const Product=mongoose.model("Product",productSchema)
module.exports=Product;