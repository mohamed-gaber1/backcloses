const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");

const createBannerValidation = [
    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("desc")
        .optional()
        .isString()
        .withMessage("Description must be a string"),

    body("btn1Text")
        .optional()
        .isString()
        .withMessage("Button 1 text must be a string"),

    body("btn1Link")
        .optional()
        .isString()
        .withMessage("Button 1 link must be a string"),

    body("btn2Text")
        .optional()
        .isString()
        .withMessage("Button 2 text must be a string"),

    body("btn2Link")
        .optional()
        .isString()
        .withMessage("Button 2 link must be a string"),

    body("order")
        .optional()
        .isInt()
        .withMessage("Order must be a number"),

    validationMiddleware
];

const updateBannerValidation = [
    body("title")
        .optional()
        .notEmpty()
        .withMessage("Title cannot be empty"),

    body("desc")
        .optional()
        .isString()
        .withMessage("Description must be a string"),

    body("btn1Text")
        .optional()
        .isString()
        .withMessage("Button 1 text must be a string"),

    body("btn1Link")
        .optional()
        .isString()
        .withMessage("Button 1 link must be a string"),

    body("btn2Text")
        .optional()
        .isString()
        .withMessage("Button 2 text must be a string"),

    body("btn2Link")
        .optional()
        .isString()
        .withMessage("Button 2 link must be a string"),

    body("order")
        .optional()
        .isInt()
        .withMessage("Order must be a number"),

    validationMiddleware
];

module.exports = {
    createBannerValidation,
    updateBannerValidation
};