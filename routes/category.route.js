const authentication=require('../middlewares/authentication.middleware')
const express = require('express')
const router = express.Router()
const { createCategoryValidat,updateCategoryValidat } = require("../validation/category.validation");
const categoryControllers = require("../controllers/category.controller");
const upload = require("../middlewares/upload.middleware");

router.post("/",
    authentication,
    upload.single("image"),
    createCategoryValidat,
    categoryControllers.createCategory
);
router.get("/",categoryControllers.getCategories)
router.patch("/:categoryId",
    authentication,
    upload.single("image"),
    updateCategoryValidat,
    categoryControllers.updateCategory
);
router.delete("/:categoryId",
    authentication,
    categoryControllers.deleteCategory
)
module.exports=router;