const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");

const createCategoryValidat = [
    body("name")
        .notEmpty()
        .withMessage("name is required"),

    validationMiddleware,
];
const updateCategoryValidat = [
    body("name")
        .optional()
        .notEmpty()
        .withMessage("name is required"),
    validationMiddleware,
];
module.exports = {
    createCategoryValidat,
    updateCategoryValidat
};