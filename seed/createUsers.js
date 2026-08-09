require("dotenv").config();

const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const User=require('../models/user.model')
const seed=async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL);
        const admin = await User.findOne({
            role:"admin"
        });
        if(!admin){
            const hashPassword = await bcrypt.hash("123456",10);
            await User.create({
                role:"admin",
                password:hashPassword
            })
        }
        const manager = await User.findOne({
            role:"manager"
        });
        if(!manager){
            const hashPassword = await bcrypt.hash("123456",10);
            await User.create({
                role:"manager",
                password:hashPassword
            })
        }
        const programmer = await User.findOne({
            role:"programmer"
        });
        if(!programmer){
            const hashPassword = await bcrypt.hash("123456",10);
            await User.create({
                role:"programmer",
                password:hashPassword
            })
        }
        console.log("Seed completed");
        process.exit(0);
    }catch(err){
    console.log(err);
    process.exit(1);
    }
}
seed();