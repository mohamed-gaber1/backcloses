const authentication=require('../middlewares/authentication.middleware')
const express = require('express')
const router = express.Router()
const { creatProductValidate,updateProductValidate } = require("../validation/product.validation");
const productControllers = require("../controllers/product.controller");
const upload = require("../middlewares/upload.middleware");


router.post("/",authentication,upload.array("images", 10),creatProductValidate,productControllers.createProduct)
router.get("/",productControllers.getProducts)
router.get("/:productId",productControllers.getProduct)
router.patch("/:productId",
    authentication,
    updateProductValidate,
    productControllers.updateProduct
);
router.delete("/:productId",
    authentication,
    productControllers.deleteProduct
)
router.patch(
    "/:productId/images",
    authentication,
    upload.array("images", 10),
    productControllers.addProductImages
);
router.delete(
    "/:productId/images",
    authentication,
    productControllers.deleteProductImage
);
module.exports=router;