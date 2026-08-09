const bcrypt=require('bcrypt');
const User = require('../models/user.model');
const jwt  = require('jsonwebtoken');

const login=async (req,res)=>{
    try{
        const{role,password}=req.body;
        const user = await User.findOne({ role }).select("+password");
        if(!user){
            return res.status(404).json({
                status:"fail",
                message:"User not found"
            })
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                status:"fail",
                message:"Invalid role or password"
            })
        }
        const token=jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )
        res.status(200).json({
            status:"success",
            token
        })

    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        })
    }
}

const changePassword=async(req,res)=>{
    try{

        const{targetRole,oldPassword,newPassword}=req.body;
    
        const currentUser = await User.findById(req.user.id).select("+password");
    
        const targetUser = await User.findOne({
            role: targetRole
        }).select("+password");
        if(!targetUser){
            return res.status(404).json({
                status:"fail",
                message:"User not found"
            })
        }
        if(req.user.role==="admin"&& targetRole !== "admin"){
            return res.status(403).json({
                status:"fail",
                message:"Forbidden"
            })
        }
        if(req.user.role==="manager"&& targetRole === "programmer"){
            return res.status(403).json({
                status:"fail",
                message:"Forbidden"
            })
        }
        const ismanChangePassword=
        req.user.role==="manager"&&(targetRole==="admin")
        const isProChangePassword=
            req.user.role==="programmer"&&(targetRole==="admin" || targetRole==="manager")
        const shouldCheckOldPassword =
            !ismanChangePassword &&
            !isProChangePassword;
        
        if (shouldCheckOldPassword && !oldPassword) {
            return res.status(400).json({
                status: "fail",
                message: "Old password is required"
            });
        }

        if (shouldCheckOldPassword) {
            const isMatch = await bcrypt.compare(
                oldPassword,
                currentUser.password
            );
        
            if (!isMatch) {
                return res.status(401).json({
                    status: "fail",
                    message: "Current password is incorrect",
                });
            }
        }
        const hashPassword = await bcrypt.hash(newPassword,10);
        targetUser.password=hashPassword;
        await targetUser.save();
        res.status(200).json({
            status:"success",
            message: "Password changed successfully",
        })
    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        })
    }
}

module.exports={login,changePassword}