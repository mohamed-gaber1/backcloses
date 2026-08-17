const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");

const createPriceRangeValidation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("minPrice")
        .notEmpty()
        .withMessage("Minimum price is required")
        .isNumeric()
        .withMessage("Minimum price must be a number"),

    body("maxPrice")
        .notEmpty()
        .withMessage("Maximum price is required")
        .isNumeric()
        .withMessage("Maximum price must be a number"),

    body("order")
        .optional()
        .isNumeric()
        .withMessage("Order must be a number"),

    validationMiddleware
];

const updatePriceRangeValidation = [
    body("name")
        .optional()
        .notEmpty()
        .withMessage("Name is required"),

    body("minPrice")
        .optional()
        .isNumeric()
        .withMessage("Minimum price must be a number"),

    body("maxPrice")
        .optional()
        .isNumeric()
        .withMessage("Maximum price must be a number"),

    body("order")
        .optional()
        .isNumeric()
        .withMessage("Order must be a number"),

    validationMiddleware
];

module.exports = {
    createPriceRangeValidation,
    updatePriceRangeValidation
};