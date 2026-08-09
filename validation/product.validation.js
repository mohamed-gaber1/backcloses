const {body}=require('express-validator');
const validationMiddleware=require('../middlewares/validation.middleware')

const creatProductValidate=[
    body("name")
        .notEmpty().withMessage("Name is required"),
    body("price")
        .notEmpty().withMessage("Price is required")
        .isNumeric().withMessage("Price must be a number"),
    body("category")
        .notEmpty().withMessage("category is required"),
    ,validationMiddleware
];
const updateProductValidate=[
    body("name")
        .optional()
        .notEmpty().withMessage("Name is required"),
    body("price")
        .optional()
        .notEmpty().withMessage("Price is required")
        .isNumeric().withMessage("Price must be a number"),
    body("category")
        .optional()
        .notEmpty().withMessage("category is required"),
    ,validationMiddleware
];
module.exports = {
    creatProductValidate,
    updateProductValidate
};