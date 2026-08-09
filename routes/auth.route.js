const authentication=require('../middlewares/authentication.middleware')
const express = require('express')
const router = express.Router()
const { loginValidation,changePasswordValidation } = require("../validation/auth.validation");
const authController = require("../controllers/auth.controller");

router.post("/login",loginValidation,authController.login)
router.patch("/change-password",
    authentication,
    changePasswordValidation,
    authController.changePassword
);
module.exports=router;